// models/Post.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String, required: true },
  images: [{ type: String }], // هتحفظي اسم الصورة بعد الرفع
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // اليوزرز اللي عملوا لايك
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Post", postSchema);
