import mongoose from 'mongoose';

const resourceSchema = mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true, enum: ['Article', 'Video', 'Webinar'] },
  field: { type: String, required: true }, // e.g., "Technology", "Healthcare"
  link: { type: String, required: true },
  img: { type: String },
}, {
  timestamps: true,
});

const Resource = mongoose.model('Resource', resourceSchema);
export default Resource;