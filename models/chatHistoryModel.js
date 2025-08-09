import mongoose from 'mongoose';

const chatHistorySchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  messages: [{
    sender: { type: String, required: true, enum: ['user', 'ai'] },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  }],
}, {
  timestamps: true,
});

const ChatHistory = mongoose.model('ChatHistory', chatHistorySchema);
export default ChatHistory;