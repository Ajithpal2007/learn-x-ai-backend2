import mongoose from 'mongoose';

const successStorySchema = mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  story: { type: String, required: true },
  image: { type: String, required: true },
}, {
  timestamps: true,
});

const SuccessStory = mongoose.model('SuccessStory', successStorySchema);
export default SuccessStory;