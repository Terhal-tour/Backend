import express from 'express';
import { authMiddleware } from './../middlewares/authMiddleware.js';
import { getRecommendations } from '../controllers/RealTimeController.js';

export const realTimeRouter = express.Router();
// Get user profile
/**
 * @swagger
 * tags:
 *   name: Real-Time AI
 *   description: Real-time AI recommendations based on location and weather
 */

/**
 * @swagger
 * /realtime:
 *   post:
 *     summary: Get smart real-time place recommendations using AI
 *     tags: [Real-Time AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lat
 *               - lng
 *             properties:
 *               lat:
 *                 type: number
 *                 example: 30.0444
 *               lng:
 *                 type: number
 *                 example: 31.2357
 *               lang:
 *                 type: string
 *                 enum: [ar, en]
 *                 example: ar
 *     responses:
 *       200:
 *         description: AI recommendations generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 lat:
 *                   type: number
 *                 lng:
 *                   type: number
 *                 temperature:
 *                   type: number
 *                 weather:
 *                   type: string
 *                 nearby_places:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       type:
 *                         type: string
 *                 recommendation:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       place:
 *                         type: string
 *                       reason:
 *                         type: string
 *       401:
 *         description: Unauthorized (JWT required)
 *       500:
 *         description: Server error or AI service failure
 */
realTimeRouter.post('/', authMiddleware, getRecommendations);