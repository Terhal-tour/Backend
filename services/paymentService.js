import Stripe from "stripe";
import GuideRequest from "../models/GuideRequest.js";
import Payment from "../models/Payment.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Create a Stripe Checkout Session for guide request
 */
export const createCheckoutSession = async (guideRequestId, user) => {
  const guideRequest = await GuideRequest.findById(guideRequestId);

  if (!guideRequest) {
    throw new Error("Guide request not found");
  }

  const totalAmount = Math.round(guideRequest.price * 100); // Convert to cents

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    customer_email: user.email,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: totalAmount,
          product_data: {
            name: `Tour Guide for ${guideRequest.duration}`,
            description: `For ${guideRequest.groupSize} people on ${new Date(guideRequest.date).toDateString()}`
          }
        },
        quantity: 1
      }
    ],
    metadata: {
      guideRequestId: guideRequest._id.toString(),
    },
    success_url: `${process.env.CLIENT_URL}/payment-success`,
    cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
  });

  return session.url;
};

/**
 * Handle webhook events from Stripe
 */
export const handleStripeWebhook = async (event) => {
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const guideRequestId = session.metadata.guideRequestId;

    // Mark the guide request as paid and completed
    const guideRequest = await GuideRequest.findByIdAndUpdate(
      guideRequestId,
      { paid: true, status: "done" },
      { new: true }
    );

    if (!guideRequest) {
      console.error("Guide request not found during webhook processing.");
      return;
    }

    const totalAmount = session.amount_total; // Amount in cents

    const guideEarning = totalAmount * 0.9;
    const platformFee = totalAmount - guideEarning;

    // Save a payment record
    await Payment.create({
      requestId: guideRequest._id,
      travelerId: guideRequest.user,
      guideId: guideRequest.guide,
      amount: totalAmount,
      guideEarning,
      platformFee,
      stripeSessionId: session.id,
      status: "paid"
    });
  }
};

/**
 * Get all paid payments for a specific guide and calculate total earnings
 */
export const getGuidePaymentsService = async (guideId) => {
  const payments = await Payment.find({ guideId, status: "paid" }).sort({ createdAt: -1 });

  const totalEarnings = payments.reduce((sum, payment) => sum + payment.guideEarning, 0);

  return { payments, totalEarnings };
};
