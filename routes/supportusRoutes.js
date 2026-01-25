// routes/supportusRoutes.js
import express from "express";
import { handleCreateCheckoutSession } from "../controllers/supportusController.js"

const router = express.Router();

// POST /supportus/checkout
/**
 * @swagger
 * tags:
 *   name: Support Us
 *   description: Donations and support payments
 */

/**
 * @swagger
 * /supportus/checkout:
 *   post:
 *     summary: Create checkout session for supporting the platform
 *     tags: [Support Us]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 100
 *               currency:
 *                 type: string
 *                 example: EGP
 *     responses:
 *       200:
 *         description: Checkout session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sessionId:
 *                   type: string
 *                 url:
 *                   type: string
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Payment service error
 */
router.post("/checkout", handleCreateCheckoutSession);

export default router;
