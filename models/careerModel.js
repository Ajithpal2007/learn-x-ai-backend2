import mongoose from 'mongoose';

const careerSchema = mongoose.Schema({
  name: { type: String, required: true },
  salary: { type: String }, // e.g., "15 LPA"
  growth: { type: String, enum: ['High', 'Medium', 'Low'] },
  cluster: { type: String, required: true }, // e.g., "Technology", "Business"
  traits: [String], // e.g., ["Analytical", "Technical"]
  rationale: { type: String },
});

const Career = mongoose.model('Career', careerSchema);
export default Career;