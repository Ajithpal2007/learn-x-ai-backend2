import mongoose from 'mongoose';

const discussionSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }, // The main body of the post
  category: { type: String, required: true, enum: ["Science", "Commerce", "Arts", "General"] },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  // We can add replies later as a sub-document if needed
}, {
  timestamps: true,
});

const Discussion = mongoose.model('Discussion', discussionSchema);
export default Discussion;