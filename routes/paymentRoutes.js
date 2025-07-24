import express from 'express';
import { createPayment, stripeWebhook } from '../controllers/paymentController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Stripe payment initiation
router.post('/create/:guideRequestId', authMiddleware, createPayment);

// Stripe webhook (raw body required!)
router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

export default router;
