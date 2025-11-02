const mongoose = require("mongoose");

// Student Schema
const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"],
  },
  bloodGroup: {
    type: String,
    required: true,
    enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
  },
  dob: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  classRoll: {
    type: String,
    required: true,
  },
  fee: {
    type: Number,
    required: true,
    min: 0,
  },
  monthlyFee: { type: Number, min: 0 },
  phone: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  otherFees: { type: Object, default: {} },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Student Model
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
