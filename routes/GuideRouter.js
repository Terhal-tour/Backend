import express from 'express';
import { authMiddleware } from './../middlewares/authMiddleware.js';
import { getGuideNearPlace, getGuideDetails } from '../controllers/GuideController.js';

export const guideRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Guides
 *   description: Guide management and lookup
 */

/**
 * @swagger
 * /guides/{placeId}/place:
 *   get:
 *     summary: Get guides near a specific place
 *     tags: [Guides]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: placeId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the place to find nearby guides
 *     responses:
 *       200:
 *         description: List of guides near the specified place
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Guide'
 */
guideRouter.get('/:placeId/place', authMiddleware, getGuideNearPlace);

/**
 * @swagger
 * /guides/{guideId}:
 *   get:
 *     summary: Get guide details by ID
 *     tags: [Guides]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: guideId
 *         required: true
 *         schema:
 *           type: string
 *         description: Guide ID
 *     responses:
 *       200:
 *         description: Guide details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Guide'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Guide:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         languages:
 *           type: array
 *           items:
 *             type: string
 *         rating:
 *           type: number
 */

guideRouter.get('/:guideId', authMiddleware, getGuideDetails);
