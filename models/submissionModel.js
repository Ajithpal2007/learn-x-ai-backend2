import mongoose from 'mongoose';

const submissionSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String },
  submissionType: {
    type: String,
    required: true,
    enum: ['Contact Request', 'Demo Request'],
  },
  // Fields specific to the 'Demo Request'
  role: { type: String },
  schoolName: { type: String },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Resolved'],
    default: 'New',
  }
}, {
  timestamps: true,
});

const Submission = mongoose.model('Submission', submissionSchema);
export default Submission;