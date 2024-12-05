const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  courseCode: { type: String, unique: true, required: true },
  courseName: { type: String, required: true },
  section: String,
  semester: String,
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }] // Add this field to reference students
});

module.exports = mongoose.model('Course', courseSchema);
