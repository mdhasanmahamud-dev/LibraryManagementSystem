const express = require("express");
const {
  addANewStudent,
  getAllStudents,
  getASingleStudent,
  updateAStudentById,
  deleteAStudent,
  addOtherFeeToClass,
  payStudentFee,
  getStudentTransactions,
} = require("../controllers/studentController");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send("From Students Routes");
});

//Get All Students
router.get("/get-all-students", getAllStudents);

//Get A Single Student
router.get("/:id", getASingleStudent);

// Delete a Student
router.delete("/:id", deleteAStudent);

// Update a single student
router.put("/:id", updateAStudentById);

// Add Other Fee To Class
router.post("/add-other-fee", addOtherFeeToClass);

//Pay Student Fee By Id
router.post("/pay-fee/:id", payStudentFee);

// Get all transactions of a student
router.get("/:id/transactions", getStudentTransactions);

// Add A New Student
router.post("/add-new-student", addANewStudent);

module.exports = router;
