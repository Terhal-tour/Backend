// routes/adminPlaceRoutes.js
import express from 'express';
import {
  createPlace,
  updatePlace,
  toggleVisibility,
} from '../controllers/adminPlaceController.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { createPlaceValidation, updatePlaceValidation } from '../validations/validatePlace.js';
import { validateInput } from '../middlewares/validateInput.js';

const router = express.Router();

// Route for creating a new place
router.post('/place',authMiddleware, isAdmin, createPlaceValidation, validateInput, createPlace);

// Route for updating a place by ID
router.put('/place/:id',authMiddleware, isAdmin, updatePlaceValidation, validateInput, updatePlace);

// Route for toggling visibility (soft delete) of a place
router.put('/place/:id/visibility',authMiddleware, isAdmin, toggleVisibility);

export default router;
