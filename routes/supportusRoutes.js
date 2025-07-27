// routes/supportusRoutes.js
import express from "express";
import { handleCreateCheckoutSession } from "../controllers/supportusController.js"

const router = express.Router();

// POST /supportus/checkout
router.post("/checkout", handleCreateCheckoutSession);

export default router;
