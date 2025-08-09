import mongoose from 'mongoose';

const scholarshipSchema = mongoose.Schema({
  name: { type: String, required: true },
  provider: { type: String, required: true }, // e.g., "Government", "Private"
  eligibility: { type: String },
  field: { type: String }, // e.g., "All", "Science"
  amount: { type: String },
  deadline: { type: Date },
}, {
  timestamps: true,
});

const Scholarship = mongoose.model('Scholarship', scholarshipSchema);
export default Scholarship;