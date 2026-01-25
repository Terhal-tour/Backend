import express from 'express';
import {
  createPayment,
  stripeWebhook,
  getGuidePayments
} from '../controllers/paymentController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment management and Stripe integration
 */

/**
 * @swagger
 * /payments/create/{guideRequestId}:
 *   post:
 *     summary: Create payment intent for a guide request
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: guideRequestId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the guide request to pay for
 *     responses:
 *       200:
 *         description: Payment created successfully
 */
router.post('/create/:guideRequestId', authMiddleware, createPayment);

/**
 * @swagger
 * /payments/webhook:
 *   post:
 *     summary: Stripe webhook endpoint
 *     tags: [Payments]
 *     requestBody:
 *       description: Raw Stripe event payload
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Webhook received successfully
 */
router.post('/webhook', stripeWebhook);

/**
 * @swagger
 * /payments/guide:
 *   get:
 *     summary: Get all paid payments and total earnings for a guide
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of payments and total earnings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalEarnings:
 *                   type: number
 *                 payments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Payment'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         guideRequestId:
 *           type: string
 *         amount:
 *           type: number
 *         status:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */

router.get('/guide', authMiddleware, getGuidePayments);

export default router;
