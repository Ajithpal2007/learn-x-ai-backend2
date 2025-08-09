import mongoose from 'mongoose';

const collegeSchema = mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  stream: { type: String, required: true },
  nirf_ranking: { type: Number },
  fees: { type: String },
  exams: [String],
  image: { type: String }, // For a banner image on the details page
  description: { type: String },
  courses: [String],
  placements: { type: String },
  admissionsProcess: { type: String },
  brochureUrl: { type: String }, // Link to a PDF brochure
  websiteUrl: { type: String } // Link to the college's official website
});

const College = mongoose.model('College', collegeSchema);
export default College;