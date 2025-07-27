import Stripe from "stripe";
import {
  createCheckoutSession,
  handleStripeWebhook,
  getGuidePaymentsService,
} from "../services/paymentService.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Create Stripe session URL and return to frontend
 */
export const createPayment = async (req, res) => {
  try {
    const url = await createCheckoutSession(req.params.guideRequestId, req.user);
    res.json({ url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Stripe webhook endpoint
 */
export const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    await handleStripeWebhook(event);
    res.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

/**
 * Get all paid payments for the logged-in guide and total earnings
 */
export const getGuidePayments = async (req, res) => {
  try {
    const guideId = req.user.id; // Logged-in guide ID
    const { payments, totalEarnings } = await getGuidePaymentsService(guideId);

    res.status(200).json({
      payments,
      totalEarnings,
    });
  } catch (error) {
    console.error("Error getting guide payments:", error);
    res.status(500).json({ error: error.message });
  }
};
