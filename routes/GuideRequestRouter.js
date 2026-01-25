import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import {
  requestGuide,
  cancelGuideRequest,
  editGuideRequest,
  getUserRequests,
  confirmGuideRequest,
  getGuideRequests,
  rejectGuideRequest
} from '../controllers/GuidRequestController.js';
import { validateInput } from '../middlewares/validateInput.js';
import { createGuideRequestValidation, updateGuideRequestValidation } from '../validations/guideRequestValidation.js';

export const guideRequestRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Guide Requests
 *   description: API endpoints for travellers and guides to manage guide requests
 */

/**
 * @swagger
 * /guide-requests/{guideId}:
 *   post:
 *     summary: Traveller can request a guide
 *     tags: [Guide Requests]
 *     parameters:
 *       - in: path
 *         name: guideId
 *         required: true
 *         schema:
 *           type: string
 *         description: Guide ID to request
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             # اضيفي الخصائص المطلوبة للطلب هنا
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               duration:
 *                 type: number
 *     responses:
 *       201:
 *         description: Guide request created successfully
 */
guideRequestRouter.post('/:guideId', createGuideRequestValidation, validateInput, authMiddleware, requestGuide);

/**
 * @swagger
 * /guide-requests/{requestId}:
 *   delete:
 *     summary: Traveller can cancel a guide request
 *     tags: [Guide Requests]
 *     parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema:
 *           type: string
 *         description: Guide request ID
 *     responses:
 *       200:
 *         description: Guide request cancelled successfully
 */
guideRequestRouter.delete('/:requestId', authMiddleware, cancelGuideRequest);

/**
 * @swagger
 * /guide-requests/{requestId}:
 *   put:
 *     summary: Traveller can edit his guide request
 *     tags: [Guide Requests]
 *     parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema:
 *           type: string
 *         description: Guide request ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             # خصائص التحديث
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               duration:
 *                 type: number
 *     responses:
 *       200:
 *         description: Guide request updated successfully
 */
guideRequestRouter.put('/:requestId', updateGuideRequestValidation, validateInput, authMiddleware, editGuideRequest);

/**
 * @swagger
 * /guide-requests/traveller:
 *   get:
 *     summary: Traveller can view all their guide requests
 *     tags: [Guide Requests]
 *     responses:
 *       200:
 *         description: List of traveller's guide requests
 */
guideRequestRouter.get('/traveller', authMiddleware, getUserRequests);

/**
 * @swagger
 * /guide-requests/all:
 *   get:
 *     summary: Guide can view all guide requests
 *     tags: [Guide Requests]
 *     responses:
 *       200:
 *         description: List of guide requests
 */
guideRequestRouter.get('/all', authMiddleware, getGuideRequests);

/**
 * @swagger
 * /guide-requests/{requestId}/confirm:
 *   put:
 *     summary: Guide can confirm a guide request
 *     tags: [Guide Requests]
 *     parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema:
 *           type: string
 *         description: Guide request ID
 *     responses:
 *       200:
 *         description: Guide request confirmed successfully
 */
guideRequestRouter.put('/:requestId/confirm', authMiddleware, confirmGuideRequest);

/**
 * @swagger
 * /guide-requests/{requestId}/reject:
 *   put:
 *     summary: Guide can reject a guide request
 *     tags: [Guide Requests]
 *     parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema:
 *           type: string
 *         description: Guide request ID
 *     responses:
 *       200:
 *         description: Guide request rejected successfully
 */
guideRequestRouter.put('/:requestId/reject', authMiddleware, rejectGuideRequest);
