import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  fromUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  toUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  time: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false }
});

export default mongoose.model("Message", messageSchema);