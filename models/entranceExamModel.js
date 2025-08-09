import mongoose from 'mongoose';

const entranceExamSchema = mongoose.Schema({
  name: { type: String, required: true }, // e.g., "IIT JEE"
  category: { type: String, required: true, enum: ["Engineering", "Medical", "Law", "Management", "Design"] },
  fullName: { type: String, required: true },
  frequency: { type: String },
  purpose: { type: String },
  eligibility: { type: String },
  pattern: { type: String },
  syllabus: { type: String },
  website: { type: String },
}, {
  timestamps: true,
});

const EntranceExam = mongoose.model('EntranceExam', entranceExamSchema);
export default EntranceExam;