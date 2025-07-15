// utils/stripe.js
import Stripe from 'stripe';

// Initialize Stripe with your secret key from .env
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default stripe;
