import mongoose from 'mongoose';

const webinarSchema = mongoose.Schema({
  title: { type: String, required: true },
  speaker: { type: String, required: true },
  image: { type: String, required: true },
  status: { type: String, required: true, enum: ['Upcoming', 'Past'] },
  // You could add a 'recordingUrl' for past webinars
  recordingUrl: { type: String }, 
}, {
  timestamps: true,
});

const Webinar = mongoose.model('Webinar', webinarSchema);
export default Webinar;