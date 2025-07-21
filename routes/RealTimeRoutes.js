import express from 'express';
import { authMiddleware } from './../middlewares/authMiddleware.js';
import { getRecommendations } from '../controllers/RealTimeController.js';

export const realTimeRouter = express.Router();
// Get user profile
realTimeRouter.post('/', authMiddleware, getRecommendations);