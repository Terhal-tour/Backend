// controllers/placeController.js
import Place from '../models/Place.js';

export const getRandomPlace = async (req, res) => {
  try {
    
    const places = await Place.aggregate([
      { $match: { visible: true } },
      { $sample: { size: 8 } }
    ]);

    if (!places || places.length === 0) {
      return res.status(404).json({ message: 'No places found' });
    }

    res.status(200).json(places); 
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};