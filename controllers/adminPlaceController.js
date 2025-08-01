// controllers/adminPlaceController.js
import mongoose from 'mongoose';
import * as placeService from '../services/adminPlaceService.js';



//Controller to handle creating a new place
// export const createPlace = async (req, res) => {
//   try {
//     const newPlace = await placeService.createPlace(req.body);
//     res.status(201).json(newPlace);
//   } catch (err) {
// res.status(500).json({ message: 'Internal Server Error', error: err.message });  }
// };


export const createPlace = async (req, res) => {
  try {
    const newPlace = await placeService.createPlace(req.body);
    res.status(201).json(newPlace);
  } catch (err) {
    const status = err.statusCode || 500;
    const message = err.statusCode === 400 ? err.message : 'Internal Server Error';
    res.status(status).json({ error: message });
  }
};
// Controller to handle updating an existing place
// export const updatePlace = async (req, res) => {
//   try {
//     const updatedPlace = await placeService.updatePlace(req.params.id, req.body);
//     if (!updatedPlace) {
//       return res.status(404).json({ message: 'Place not found' });
//     }
//     res.status(200).json(updatedPlace);
//   } catch (err) {
//     res.status(500).json({ message: 'Internal Server Error', error: err.message });
//   }
// };

export const updatePlace = async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Place not found" });
  }

  try {
    const updatedPlace = await placeService.updatePlace(id, req.body);
    res.status(200).json(updatedPlace);
  } catch (err) {
    const status = err.statusCode || 500;
    const message = status === 400 ? err.message : "Internal Server Error";
    res.status(status).json({ error: message });
  }
};
//  Controller to handle toggling the visibility of a place (soft delete)
export const toggleVisibility = async (req, res) => {
  try {
    const place = await placeService.togglePlaceVisibility(req.params.id);
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.status(200).json({ message: 'Visibility toggled', visible: place.visible });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

export const getadminPlaces = async (req, res) => {
  try {
    const places = await placeService.getAllAdminPlaces(req.query);
    res.status(200).json(places);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
