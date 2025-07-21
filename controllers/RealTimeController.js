import { getSmartRecommendations } from "../services/recommendationService.js";


export const getRecommendations = async (req, res) => {
try {
const { lat, lng } = req.body;


if (!lat || !lng) {
  return res.status(400).json({ message: "lat and lng are required" });
}

const result = await getSmartRecommendations(lat, lng);
return res.status(200).json(result);
} catch (err) {
console.error("Error in getRecommendations:", err.message);
res.status(500).json({ message: "Failed to get recommendations", error: err.message });
}
};

