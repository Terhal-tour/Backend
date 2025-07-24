import { createCheckoutSession, handleStripeWebhook } from "../services/paymentService.js";

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
    event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
    await handleStripeWebhook(event);
    res.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};
