import mongoose from 'mongoose';

const boardPrepSchema = mongoose.Schema({
  board: { type: String, required: true }, // e.g., "CBSE", "ICSE"
  class: { type: String, required: true }, // e.g., "10", "12"
  examInformation: { type: String, required: true },
  studyResources: {
    textbooks: { type: String },
    samplePapers: { type: String },
    mockTests: { type: String },
  },
  preparationStrategies: { type: String },
  expertAdvice: { type: String },
});

const BoardPrep = mongoose.model('BoardPrep', boardPrepSchema);
export default BoardPrep;