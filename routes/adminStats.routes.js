import express from 'express';
import {
  getOverviewStats,
  getNationalitiesStats,
  getTopRatedPlaces,
  getReviewsAnalysis
} from '../controllers/adminStats.controller.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { authMiddleware } from './../middlewares/authMiddleware.js';

const router = express.Router();
router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Admin Statistics
 *   description: Admin dashboard statistics endpoints
 */

/**
 * @swagger
 * /admin/stats/overview:
 *   get:
 *     summary: Get overview statistics (Admin only)
 *     tags: [Admin Statistics]
 *     responses:
 *       200:
 *         description: Overview statistics
 */
router.get('/overview', isAdmin, getOverviewStats);

/**
 * @swagger
 * /admin/stats/nationalities:
 *   get:
 *     summary: Get nationalities statistics (Admin only)
 *     tags: [Admin Statistics]
 *     responses:
 *       200:
 *         description: Nationalities statistics
 */
router.get('/nationalities', isAdmin, getNationalitiesStats);

/**
 * @swagger
 * /admin/stats/top-rated:
 *   get:
 *     summary: Get top rated places (Admin only)
 *     tags: [Admin Statistics]
 *     responses:
 *       200:
 *         description: Top rated places
 */
router.get('/top-rated', isAdmin, getTopRatedPlaces);

/**
 * @swagger
 * /admin/stats/reviews-analysis:
 *   get:
 *     summary: Get reviews analysis (Admin only)
 *     tags: [Admin Statistics]
 *     responses:
 *       200:
 *         description: Reviews analysis
 */
router.get('/reviews-analysis', isAdmin, getReviewsAnalysis);

export default router;
