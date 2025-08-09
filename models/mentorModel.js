import mongoose from 'mongoose';

const mentorSchema = mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  field: { type: String, required: true },
  img: { type: String, required: true },
  // You could add more details like a bio, years of experience, etc.
  bio: { type: String },
}, {
  timestamps: true,
});

const Mentor = mongoose.model('Mentor', mentorSchema);
export default Mentor;