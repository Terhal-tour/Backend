// // routes/ratingRoutes.js
// import express from "express";
// import { ratePlaceController ,
//     getPlaceRatingController,
//     getUserRatingForPlaceController,
//     deleteUserRatingController,
//  }
//  from "../../controllers/place-controllers/RatingPlace.controller.js";
// import { authMiddleware } from "../../middlewares/authMiddleware.js";

// const router = express.Router();

// router.post("/:id/rate", authMiddleware, ratePlaceController); //used
// router.get("/:id/rating", getPlaceRatingController);
// router.get("/:id/user-rating", authMiddleware, getUserRatingForPlaceController);  
// router.delete("/:id/rating", authMiddleware, deleteUserRatingController);


// export default router;

























import express from "express";
import {
  ratePlaceController,
  getPlaceRatingController,
  getUserRatingForPlaceController,
  deleteUserRatingController,
} from "../../controllers/place-controllers/RatingPlace.controller.js";

import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Add or update a rating for a place (auth required)
router.post("/:id/rate", authMiddleware, ratePlaceController);

// ✅ Get the average rating for a place (public)
router.get("/:id/rating", getPlaceRatingController);

// ✅ Get the logged-in user's rating for a place (auth required)
router.get("/:id/user-rating", authMiddleware, getUserRatingForPlaceController);

// ✅ Delete the logged-in user's rating for a place (auth required)
router.delete("/:id/rating", authMiddleware, deleteUserRatingController);

export default router;
