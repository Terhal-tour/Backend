// controllers/payment.controller.js
import { createStripeCheckoutSession } from "../services/paymentService.js";

/**
 * Handle donation checkout session creation.
 * POST /payment/checkout
 */
export const handleCreateCheckoutSession = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount < 1) {
      return res.status(400).json({ message: "Invalid donation amount." });
    }

    const sessionUrl = await createStripeCheckoutSession(amount);

    res.json({ url: sessionUrl });
  } catch (error) {
    console.error("Stripe Payment Error:", error);
    res.status(500).json({ message: "Payment session creation failed." });
  }
};
