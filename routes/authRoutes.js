import express from "express";
import { register, login, forgetPassword, resetPassword, verifyEmail } from "../controllers/authController.js";
import { validateInput } from "../middlewares/validateInput.js";
import { body } from "express-validator";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - mobile
 *               - nationality
 *               - language
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               mobile:
 *                 type: string
 *               nationality:
 *                 type: string
 *               language:
 *                 type: string
 *                 enum: [AR, EN]
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post(
  "/register",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body("mobile").notEmpty(),
    body("nationality").notEmpty(),
    body("language").isIn(["AR", "EN"]),
  ],
  validateInput,
  register
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password").notEmpty(),
  ],
  validateInput,
  login
);

/**
 * @swagger
 * /auth/forgetPassword:
 *   post:
 *     summary: Send password reset email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset email sent
 */
router.post(
  "/forgetPassword",
  [body("email").isEmail()],
  validateInput,
  forgetPassword
);

/**
 * @swagger
 * /auth/verify-email/{token}:
 *   post:
 *     summary: Verify user email
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email verified successfully
 */
router.post("/verify-email/:token", verifyEmail);

/**
 * @swagger
 * /auth/resetPassword:
 *   post:
 *     summary: Reset user password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [token, password]
 *             properties:
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 */
router.post(
  "/resetPassword",
  [
    body("password").notEmpty(),
  ],
  validateInput,
  resetPassword
);

export default router;
