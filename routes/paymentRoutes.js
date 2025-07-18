// routes/payment.route.js
import express from "express";
import { handleCreateCheckoutSession } from "../controllers/paymentController.js"

const router = express.Router();

// POST /payment/checkout
router.post("/checkout", handleCreateCheckoutSession);

export default router;
