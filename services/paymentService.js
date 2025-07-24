import Stripe from "stripe";
import GuideRequest from "../models/GuideRequest.js";

// Stripe secret key from .env
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Create a Stripe Checkout Session for guide request
 */
export const createCheckoutSession = async (guideRequestId, user) => {
  const guideRequest = await GuideRequest.findById(guideRequestId);

  if (!guideRequest) {
    throw new Error("Guide request not found");
  }

  // Create a checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    customer_email: user.email,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: 5000, // $50 (in cents)
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

    //  Update the guide request with paid = true
    await GuideRequest.findByIdAndUpdate(guideRequestId, {
      paid: true,
      status: 'done',

    });

    // (اختياري) يمكنك إنشاء سجل في Model الدفع (Payment) هنا أيضًا إن أردت
  }
};
