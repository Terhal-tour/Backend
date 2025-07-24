import { createStripeCheckoutSession } from "../services/supportusService.js";

/**
 * Handle support us checkout session creation.
 * POST /supportus/checkout
 */
export const handleCreateCheckoutSession = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount < 1) {
      return res.status(400).json({ message: "Invalid support amount." });
    }

    const sessionUrl = await createStripeCheckoutSession(amount);

    res.status(200).json({ url: sessionUrl });
  } catch (error) {
    console.error("Stripe SupportUs Error:", error);
    res.status(500).json({ message: "Support session creation failed." });
  }
};
