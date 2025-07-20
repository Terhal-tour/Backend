import mongoose from "mongoose";
import Rating from "../../models/Rating.js";
import Place from "../../models/Place.js";

// Helper to recalculate and save avg for a place
const recalculatePlaceAverage = async (placeId) => {
  const result = await Rating.aggregate([
    { $match: { placeId: new mongoose.Types.ObjectId(placeId) } },
    {
      $group: {
        _id: "$placeId",
        avgRating: { $avg: "$rating" },
        totalRatings: { $sum: 1 },
      },
    },
  ]);

  const avgRating = result.length > 0 ? result[0].avgRating : 0;

  await Place.findByIdAndUpdate(placeId, { rating: avgRating });

  return avgRating;
};

export const ratePlace = async (userId, placeId, ratingValue) => {
  if (ratingValue < 1 || ratingValue > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  if (!mongoose.Types.ObjectId.isValid(placeId)) {
    throw new Error("Invalid place ID");
  }

  // ✅ Add or update user's rating with upsert
  await Rating.findOneAndUpdate(
    { userId, placeId },
    { userId, placeId, rating: ratingValue },
    { upsert: true, new: true }
  );

  // ✅ Recalculate avg
  const avgRating = await recalculatePlaceAverage(placeId);

  return { message: "Rating saved", newRating: ratingValue, avgRating };
};

export const getPlaceRating = async (placeId) => {
  if (!mongoose.Types.ObjectId.isValid(placeId)) {
    throw new Error("Invalid place ID");
  }

  const place = await Place.findById(placeId);
  if (!place) {
    throw new Error("Place not found");
  }

  return {
    avgRating: place.rating || 0,
  };
};

export const getUserRatingForPlace = async (userId, placeId) => {
  if (!mongoose.Types.ObjectId.isValid(placeId)) {
    throw new Error("Invalid place ID");
  }

  const userRating = await Rating.findOne({ userId, placeId });
  if (!userRating) {
    return { rating: null, message: "User has not rated this place" };
  }

  return { rating: userRating.rating, message: "User rating found" };
};

export const deleteUserRating = async (userId, placeId) => {
  if (!mongoose.Types.ObjectId.isValid(placeId)) {
    throw new Error("Invalid place ID");
  }

  const userRating = await Rating.findOne({ userId, placeId });
  if (!userRating) {
    return { message: "User has not rated this place" };
  }

  await Rating.deleteOne({ userId, placeId });

  const avgRating = await recalculatePlaceAverage(placeId);

  return { message: "User rating deleted", avgRating };
};

