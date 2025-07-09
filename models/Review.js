// models/Review.js
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  placeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
  status: { type: String, enum: ['happy', 'ordinary', 'sad'] },
  review: String,
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);
export default Review;
