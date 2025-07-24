import Place from "../models/Place.js";
import User from "../models/User.js";


// export const findGuidesNearPlace = async (placeId) => {
//     if (!placeId) {
//         throw new Error("Place ID is required");
//     }

//     const guides = await User.find({ placeId, role: 'guide' });
//     return guides;
// };



export const findGuidesNearPlace = async (placeId) => {
  if (!placeId) {
    throw new Error("Place ID is required");
  }

  // Fetch place by ID
  const place = await Place.findById(placeId);
  if (!place) {
    throw new Error("Place not found");
  }

  const [lat, lng] = place.coordinates.split(',').map(Number);
  const RADIUS_KM = 50; // Adjust radius as needed

  // Haversine formula to find nearby guides
  const guides = await User.find({
    role: 'guide',
    isDeleted: false,
    isVerified: true,
    lastLat: { $ne: null },
    lastLng: { $ne: null },
  }).lean();

  const nearbyGuides = guides.filter((guide) => {
    const dLat = (guide.lastLat - lat) * Math.PI / 180;
    const dLng = (guide.lastLng - lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) ** 2 + Math.cos(lat * Math.PI / 180) * Math.cos(guide.lastLat * Math.PI / 180) * Math.sin(dLng/2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = 6371 * c; // Earth radius in KM

    return distance <= RADIUS_KM;
  });

  return nearbyGuides;
};








export const getGuideDetailsService = async (guideId) => {
    if (!guideId) {
        throw new Error("Guide ID is required");
    }

    const guide = await User.findById(guideId);
    if (!guide || guide.role !== 'guide') {
        throw new Error("Guide not found or invalid role");
    }

    return guide;
};