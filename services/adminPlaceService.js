// services/placeService.js
import Place from "../models/Place.js";




// Service function to create a new place
export const createPlace = async (placeData) => {
  const { name, address, category, coordinates } = placeData;

  // Name validation: Arabic/English letters, spaces, hyphens, apostrophes
  const nameRegex = /^[\p{Script=Arabic}A-Za-z\s'-]+$/u;
  if (!nameRegex.test(name)) {
    const error = new Error(
      "Invalid name. Only Arabic/English letters, spaces, hyphens (-), and apostrophes (') are allowed."
    );
    error.statusCode = 400;
    throw error;
  }

  // Coordinates validation
  const coordRegex = /^-?\d{1,3}\.\d+,-?\d{1,3}\.\d+$/; // e.g., 30.123456,31.654321
  if (!coordRegex.test(coordinates)) {
    const error = new Error("Please enter valid latitude and longitude coordinates.");
    error.statusCode = 400;
    throw error;
  }

  // Optional: split and validate latitude and longitude individually
  const [lat, lng] = coordinates.split(',').map(Number);
  if (
    isNaN(lat) || isNaN(lng) ||
    lat < -90 || lat > 90 ||
    lng < -180 || lng > 180
  ) {
    const error = new Error("Latitude must be between -90 and 90, and longitude between -180 and 180.");
    error.statusCode = 400;
    throw error;
  }

  // Check for duplicates
  const existingPlace = await Place.findOne({ name, address, category });
  if (existingPlace) {
    const error = new Error("Place already exists");
    error.statusCode = 400;
    throw error;
  }

  const place = new Place(placeData);
  return await place.save();
};


// Service function to update an existing place by ID
// export const updatePlace = async (id, updateData) => {
//   const place = await Place.findByIdAndUpdate(id, updateData, { new: true });
//   return place;
// };

export const updatePlace = async (id, updateData) => {
  const place = await Place.findByIdAndUpdate(id, updateData, { new: true });

  if (!place) {
    const error = new Error("Place not found");
    error.statusCode = 400; // tell controller this is a handled, known error
    throw error;
  }

  return place;
};



// Service function to toggle the visibility of a place by ID
export const togglePlaceVisibility = async (id) => {
  const place = await Place.findById(id);
  if (!place) return null;

  place.visible = !place.visible;
  await place.save();
  return place;
};

export const getAllAdminPlaces = async (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;


  const places = await Place.find().skip(skip).limit(limit);
  const total = await Place.countDocuments(); 

  return {
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalItems: total,
    data: places,
  };
};
