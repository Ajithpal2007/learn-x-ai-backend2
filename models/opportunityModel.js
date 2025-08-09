import mongoose from 'mongoose';
const opportunitySchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String },
  category: { type: String, required: true, enum: ['Micro-Skill', 'Internship', 'Project', 'Shadowing'] },
}, { timestamps: true });
const Opportunity = mongoose.model('Opportunity', opportunitySchema);
export default Opportunity;