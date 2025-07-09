// routes/adminStatsRoutes.js
import express from 'express';
import {
  getOverviewStats,
  getNationalitiesStats,
  getTopRatedPlaces,
  getReviewsAnalysis
} from '../controllers/adminStats.controller.js';

import { protect } from '../middlewares/protect.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = express.Router();

router.get('/overview', protect, isAdmin, getOverviewStats);
router.get('/nationalities', protect, isAdmin, getNationalitiesStats);
router.get('/top-rated', protect, isAdmin, getTopRatedPlaces);
router.get('/reviews-analysis', protect, isAdmin, getReviewsAnalysis);

export default router;
