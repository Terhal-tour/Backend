import mongoose from "mongoose";

const guideRequestSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  userEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  paid: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  groupSize: {
    type: Number,
    required: true,
    min: 1,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true
  },
  guideId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  guide: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const GuideRequest = mongoose.model("GuideRequest", guideRequestSchema);

export default GuideRequest;
