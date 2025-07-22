import User from "../models/User.js";

export const findGuidesNearPlace = async (placeId) => {
    if (!placeId) {
        throw new Error("Place ID is required");
    }

    const guides = await User.find({ placeId, role: 'guide' });
    return guides;
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