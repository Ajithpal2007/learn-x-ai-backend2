import mongoose from 'mongoose';

const vocationalCourseSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  // You could add fields like 'duration', 'eligibility', 'certifyingBody'
}, {
  timestamps: true,
});

const VocationalCourse = mongoose.model('VocationalCourse', vocationalCourseSchema);
export default VocationalCourse;