import express from 'express';
import {
  createReview,
  getAllReviews,
  getMyReview,
  updateReview,
  deleteReview
} from '../../controllers/user-controllers/review.controller.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { validateCreateReview, validateUpdateReview } from '../../validations/reviresValidation.js';
import { validateInput } from '../../middlewares/validateInput.js';

const router = express.Router();

// Public: Get all reviews
router.get('/', getAllReviews);

// Authenticated: Create, get own, update, delete
router.post('/',validateCreateReview,validateInput, authMiddleware, createReview);
router.get('/me', authMiddleware, getMyReview);
router.patch('/' ,validateUpdateReview,validateInput, authMiddleware, updateReview);
router.delete('/', authMiddleware, deleteReview);

export default router; 