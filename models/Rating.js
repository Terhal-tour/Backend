// models/rating.js
import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  placeId: {
    type: String,
    required: true,
    ref: 'Place',
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
}, {
  timestamps: true,
});

ratingSchema.index({ userId: 1, placeId: 1 }, { unique: true });


const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;
