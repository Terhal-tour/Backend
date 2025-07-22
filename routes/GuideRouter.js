import express from 'express';
import { authMiddleware } from './../middlewares/authMiddleware.js';
import { getGuideNearPlace ,getGuideDetails } from '../controllers/GuideController.js';
export const guideRouter = express.Router();
// Get user profile
guideRouter.get('/:placeId/place', authMiddleware, getGuideNearPlace);
guideRouter.get('/:guideId', authMiddleware, getGuideDetails);
