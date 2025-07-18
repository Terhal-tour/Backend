// services/payment.service.js
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Creates a Stripe Checkout Session for donations.
 * @param {number} amount - Amount in USD dollars.
 * @returns {Promise<string>} session URL.
 */
export const createStripeCheckoutSession = async (amount) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Support Us Donation",
          },
          unit_amount: amount * 100, // Stripe uses cents
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.CLIENT_URL}/payment-success`,
    cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
  });

  return session.url;
};
