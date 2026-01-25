import express from 'express';
import { getUser, updateUser } from '../controllers/profileController.js';
import { protect } from '../middlewares/protectMiddleware.js'
import { upload } from '../middlewares/upload.js'
const router = express.Router();
// Get user profile

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: User profile management
 */

/**
 * @swagger
 * /profile/me:
 *   get:
 *     summary: Get logged-in user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/me', protect, getUser);
// Update user profile

/**
 * @swagger
 * /profile/update:
 *   put:
 *     summary: Update logged-in user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Safaa Magdy
 *               phone:
 *                 type: string
 *                 example: "01012345678"
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 */
router.put('/update', protect, upload.single('image'), updateUser );
export default router;