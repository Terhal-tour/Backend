import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: "GuideRequest", required: true },
  travelerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  guideId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true }, // Total amount paid by traveler
  guideEarning: { type: Number, required: true }, // Amount after 10% deduction
  stripeSessionId: { type: String }, // ID for tracking session via Stripe
  status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Payment", paymentSchema);
