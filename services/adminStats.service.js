// services/adminStats.service.js
import User from "../models/User.js";
import History from "../models/History.js";
import Rating from "../models/Rating.js";
import Review from "../models/Review.js";
import redisClient from "../lib/redisClient.js";
import Place from "../models/Place.js";
import Event from "../models/Event.js";
import { normalizeNationality } from "../utils/normalizeNationality.js";

export const getOverviewStatsService = async () => {
  const travelersCount = await User.countDocuments({ role: "traveler" });

  const onlineUsers = await redisClient.sMembers("onlineUsers");
  const onlineUsersCount = onlineUsers.length;

  const totalPlaces = await Place.countDocuments();
  const totalEvents = await Event.countDocuments();

  const topLikedPlaces = await History.aggregate([
    { $group: { _id: "$placeId", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: "places",
        localField: "_id",
        foreignField: "_id",
        as: "place",
      },
    },
    { $unwind: "$place" },
  ]);

  return {
    travelersCount,
    onlineUsersCount,
    totalPlaces,
    totalEvents,
    topLikedPlaces,
  };
};

// export const getNationalitiesStatsService = async () => {
//   const nationalities = await User.aggregate([
//     { $group: { _id: "$nationality", count: { $sum: 1 } } },
//     { $sort: { count: -1 } }
//   ]);
//   return { nationalities };
// };

export const getNationalitiesStatsService = async () => {
  const rawNationalities = await User.aggregate([
    { $group: { _id: "$nationality", count: { $sum: 1 } } },
  ]);

  const statsMap = {};

  for (const entry of rawNationalities) {
    const normalized = normalizeNationality(entry._id);
    statsMap[normalized] = (statsMap[normalized] || 0) + entry.count;
  }

  const nationalities = Object.entries(statsMap)
    .map(([name, count]) => ({ _id: name, count }))
    .sort((a, b) => b.count - a.count);

  return { nationalities };
};

export const getTopRatedPlacesService = async () => {
  const topRated = await Rating.aggregate([
    {
      $group: {
        _id: "$placeId",
        averageRating: { $avg: "$rating" },
        count: { $sum: 1 },
      },
    },
    { $sort: { averageRating: -1, count: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: "places",
        localField: "_id",
        foreignField: "_id",
        as: "place",
      },
    },
    { $unwind: "$place" },
  ]);
  return { topRated };
};

export const getReviewsAnalysisService = async () => {
  const statusStats = await Review.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  return { statusStats };
};
