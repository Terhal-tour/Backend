import express from 'express';
import { body } from 'express-validator'; 
import { validateInput } from '../middlewares/validateInput.js';
import { login } from '../controllers/AdminAuthController.js';

const adminAuthRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin Auth
 *   description: Admin authentication routes
 */

/**
 * @swagger
 * /admin/auth/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admin Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin logged in successfully
 */
adminAuthRouter.post(
  '/login', 
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ], 
  validateInput, 
  login
);

export default adminAuthRouter;
