import express from 'express';
import { chatWithAssistant } from '../controllers/AssestantController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const assistantRouter = express.Router();
assistantRouter.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: AI Assistant
 *   description: Endpoints for AI-powered assistant
 */

/**
 * @swagger
 * /assestant/plan-trip:
 *   post:
 *     summary: AI trip planner
 *     tags: [AI Assistant]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - destination
 *               - startDate
 *               - endDate
 *             properties:
 *               destination:
 *                 type: string
 *                 description: Destination city or country
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Trip start date
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: Trip end date
 *               preferences:
 *                 type: string
 *                 description: Optional user preferences for the trip
 *     responses:
 *       200:
 *         description: AI trip plan generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 itinerary:
 *                   type: string
 *                   description: Generated trip plan
 */
assistantRouter.post('/plan-trip', chatWithAssistant);

export default assistantRouter;
