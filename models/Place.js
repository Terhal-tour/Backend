// models/place.js
import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema({
  name: {   
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: null, 
  },
  location: String,
  address: String,
  category: String,
  coordinates: String,
  image: String,
  rating: {
    type: Number,
    default: 0,
  },
  visible: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true, // optional: adds createdAt, updatedAt
});
placeSchema.index({ name: 1, address: 1, category: 1 }, { unique: true });
placeSchema.index({ name: "text" });
const Place = mongoose.model('Place', placeSchema);

export default Place;
