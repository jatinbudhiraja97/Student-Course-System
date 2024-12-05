// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentNumber: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: String,
  city: String,
  phoneNumber: String,
  email: { type: String, unique: true, required: true },
  program: String,
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

module.exports = mongoose.model('Student', studentSchema);
