import express from 'express';
import {
  createPayment,
  stripeWebhook,
  getGuidePayments
} from '../controllers/paymentController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Stripe payment initiation
router.post('/create/:guideRequestId', authMiddleware, createPayment);

// Stripe webhook (raw body required!)
router.post('/webhook', stripeWebhook);

// Get all paid payments and total earnings for a guide
router.get('/guide', authMiddleware, getGuidePayments);

export default router;
