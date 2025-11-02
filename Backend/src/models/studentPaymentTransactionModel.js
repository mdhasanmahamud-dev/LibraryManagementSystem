const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  studentName: { type: String, required: true },
  feeType: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const StudentTransaction = mongoose.model(
  "StudentTransaction",
  transactionSchema
);
module.exports = StudentTransaction;
