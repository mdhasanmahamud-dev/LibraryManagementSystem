const Student = require("../models/studentModel");
const StudentTransaction = require("../models/studentPaymentTransactionModel");

// Get All Students
const getAllStudents = async (req, res) => {
  try {
    const { studentName, classRoll, className } = req.query;
    const filters = {};
    // Search by student name or class roll
    if (studentName || classRoll) {
      filters.$or = [];
      if (studentName) {
        filters.$or.push({
          studentName: { $regex: studentName, $options: "i" },
        });
      }
      if (classRoll) {
        filters.$or.push({ classRoll: { $regex: classRoll, $options: "i" } });
      }
    }
    // Filter by class name
    if (className) {
      filters.className = className;
    }
    // Projection
    const projection = {
      studentName: 1,
      className: 1,
      classRoll: 1,
      image: 1,
      _id: 1,
    };

    // Get students data
    const students = await Student.find(filters, projection).sort({
      createdAt: -1,
    });
    //Count total students
    const totalStudents = await Student.countDocuments();

    const result = await Student.aggregate([
      {
        $addFields: {
          otherFeesArray: { $objectToArray: "$otherFees" },
        },
      },
      {
        $addFields: {
          otherFeesTotal: {
            $sum: "$otherFeesArray.v",
          },
        },
      },
      {
        $addFields: {
          totalStudentFee: { $add: ["$fee", "$otherFeesTotal"] },
        },
      },
      {
        $group: {
          _id: null,
          grandTotal: { $sum: "$totalStudentFee" },
        },
      },
    ]);
    const totalStudentFees = result.length > 0 ? result[0].grandTotal : 0;
    res.status(200).json({
      message: "Students fetched successfully",
      students,
      totalStudents,
      totalStudentFees,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch students",
      error: error.message,
    });
  }
};

//Get A Single Student By Id
const getASingleStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    //If Student  Not Found
    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }
    //Calculate total fee
    const basicFee = student.fee || 0;
    const otherFees = student.otherFees || {};
    const otherFeesTotal = Object.values(otherFees).reduce(
      (sum, value) => sum + Number(value),
      0
    );
    const totalFee = basicFee + otherFeesTotal;

    //If Student Found
    res.status(200).json({
      message: "Student fetched successfully",
      student,
      otherFeesTotal,
      totalFee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get single student",
      error: error.message,
    });
  }
};

//Delete A Student By Id
const deleteAStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).json({
        message: "Student not found",
      });
    }
    res.status(200).json({
      message: "Student deleted successfully",
      student: deletedStudent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete student",
      error: error.message,
    });
  }
};
//Update A Student By Id
const updateAStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    //If Student Not Found
    if (!updatedStudent) {
      return res.status(404).json({
        message: "Student not found",
      });
    }
    //If Student Updated
    res.status(200).json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update student",
      error: error.message,
    });
  }
};
// Add or Update Other Fee for a class
const addOtherFeeToClass = async (req, res) => {
  try {
    const { className, feeType, amount } = req.body;
    if (!className || !feeType || !amount) {
      return res.status(400).json({
        message: "Class name, fee type, and amount are required",
      });
    }
    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({
        message: "Amount must be a positive number",
      });
    }

    const studentsInClass = await Student.find({ className }).limit(1);
    if (studentsInClass.length === 0) {
      return res
        .status(404)
        .json({ message: `No students found for class ${className}` });
    }

    const updateData = { $inc: { [`otherFees.${feeType}`]: numericAmount } };
    const updatedStudents = await Student.updateMany(
      { className },
      updateData,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: `${feeType} updated by ${numericAmount}`,
      updatedCount: updatedStudents.nModified,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add other fee to class",
      error: error.message,
    });
  }
};

// Pay Student Fee
const payStudentFee = async (req, res) => {
  try {
    const { id } = req.params;
    const { feeType } = req.body;
    const amount = Number(req.body.amount);

    // সর্বোচ্চ কতোটি ট্রানজ্যাকশন রাখা হবে
    const MAX_TRANSACTIONS = 5;

    // Validation
    if (!amount || isNaN(amount) || amount <= 0 || !Number.isInteger(amount)) {
      return res
        .status(400)
        .json({ message: "Payment must be a positive integer" });
    }

    // Student খুঁজে বের করো
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Update করার জন্য ডাটা রাখার variable
    let updatedData = {};
    let finalFeeType = feeType || "Tuition Fee";

    // =============== MAIN FEE HANDLE (অপরিবর্তিত) ===============
    if (!feeType) {
      const monthlyFee = student.monthlyFee;
      if (amount !== monthlyFee) {
        return res.status(400).json({
          message: `You must pay the full monthly fee of ${monthlyFee} Taka.`,
        });
      }
      updatedData.fee = student.fee - amount;
    }
    // =============== OTHER FEE HANDLE (অপরিবর্তিত) ===============
    else {
      const existingFee = student.otherFees[feeType] || 0;
      if (existingFee < amount) {
        return res
          .status(400)
          .json({ message: `Amount exceeds ${feeType} fee` });
      }
      updatedData.otherFees = {
        ...student.otherFees,
        [feeType]: existingFee - amount,
      };
    }

    // Updated student data DB তে save করো
    const updatedStudent = await Student.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    // ================= CREATE TRANSACTION (অপরিবর্তিত) =================
    const transaction = new StudentTransaction({
      studentId: student._id,
      studentName: student.studentName,
      feeType: feeType || "Tuition Fee",
      amount,
    });
    await transaction.save(); // নতুন ট্রানজ্যাকশন সেভ করা হলো

    // ================= ট্রানজ্যাকশন হিস্টরি রোটেশন (নতুন যোগ করা হলো) =================

    // 1. ঐ student এর সব ট্রানজ্যাকশন খুঁজে বের করো এবং 'date' অনুযায়ী সবচেয়ে পুরোনো থেকে নতুন সাজাও
    const transactions = await StudentTransaction.find({
      studentId: student._id,
    })
      .sort({ date: 1 })
      .exec();

    // 2. যদি ট্রানজ্যাকশন সংখ্যা 5 (MAX_TRANSACTIONS)-এর বেশি হয়
    if (transactions.length > MAX_TRANSACTIONS) {
      const transactionsToDelete = transactions
        .slice(0, transactions.length - MAX_TRANSACTIONS) // প্রথম (সবচেয়ে পুরোনো) ট্রানজ্যাকশনগুলো স্লাইস করা হলো
        .map((t) => t._id);
      await StudentTransaction.deleteMany({
        _id: { $in: transactionsToDelete },
      });
    }

    // ================= CREATE RECEIPT DATA (সংক্ষিপ্ত) =================
    const receiptData = {
      madrasaName: "মাওলানা কাসেমীয়া ইসলামী ফাযিল মাদ্রাসা", // 👈 আপনার মাদ্রাসার নাম
      receiptNumber: transaction._id.toString().slice(-8).toUpperCase(),
      date: new Date().toLocaleDateString("bn-BD", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      studentName: updatedStudent.studentName,
      className: updatedStudent.className,
      roll: updatedStudent.classRoll,
      feeType: finalFeeType,
      amountPaid: amount,
    };

    res.status(200).json({
      message: "Payment successful",
      student: updatedStudent,
      transaction,
      receiptData: receiptData, // 👈 প্রিন্টের জন্য ডেটা
      printReady: true, // 👈 প্রিন্ট করার সিগন্যাল
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to process payment",
      error: error.message,
    });
  }
};

// Get Student Transactions By Student Id
const getStudentTransactions = async (req, res) => {
  const { id } = req.params;
  try {
    const transactions = await StudentTransaction.find({ studentId: id }).sort({
      date: -1,
    });
    if (transactions.length === 0) {
      return res
        .status(404)
        .json({ message: "No transactions found for this student" });
    }

    res.status(200).json({
      message: "Transactions fetched successfully",
      transactions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch transactions",
      error: error.message,
    });
  }
};

//Add A New Student
const addANewStudent = async (req, res) => {
  try {
    const studentData = req.body;

    // monthlyFee auto save (যা ইউজার input দেবে)
    studentData.monthlyFee = studentData.fee;

    // fee multiply by 12 before saving
    if (studentData.fee) {
      studentData.fee = studentData.fee * 12;
    }
    const newStudent = new Student(studentData);
    const saveStudent = await newStudent.save();
    res.status(200).json({
      message: "Student added successfully",
      saveStudent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add student",
      error: error.message,
    });
  }
};

module.exports = {
  getAllStudents,
  getASingleStudent,
  deleteAStudent,
  updateAStudentById,
  addOtherFeeToClass,
  payStudentFee,
  getStudentTransactions,
  addANewStudent,
};
