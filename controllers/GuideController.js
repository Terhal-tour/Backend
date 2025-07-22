
import { findGuidesNearPlace, getGuideDetailsService } from "../services/guideService.js";

export const getGuideNearPlace = async (req, res) => {
    try {
        const { placeId } = req.params;
        console.log(placeId);

        const guides = await findGuidesNearPlace(placeId);

        if (!guides || guides.length === 0) {
            return res.status(404).json({ message: 'No guides found near this place' });
        }

        res.status(200).json(guides);
    } catch (error) {
        console.error('Error fetching guides:', error);
        const statusCode = error.message === "Place ID is required" ? 400 : 500;
        res.status(statusCode).json({ message: error.message });
    }
};
export const getGuideDetails = async (req, res) => {
    try {
        const { guideId } = req.params;

        const guide = await getGuideDetailsService(guideId);

        if (!guide) {
            return res.status(404).json({ message: 'Guide not found' });
        }

        res.status(200).json(guide);
    } catch (error) {
        console.error('Error fetching guide details:', error);
        const statusCode = error.message === "Guide ID is required" ? 400 : 500;
        res.status(statusCode).json({ message: error.message });
    }
};
