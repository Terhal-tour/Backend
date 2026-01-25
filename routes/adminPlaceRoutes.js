import express from 'express';
import {
  createPlace,
  updatePlace,
  toggleVisibility,
  getadminPlaces,
} from '../controllers/adminPlaceController.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { createPlaceValidation, updatePlaceValidation } from '../validations/validatePlace.js';
import { validateInput } from '../middlewares/validateInput.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin Places
 *   description: Admin operations for places
 */

/**
 * @swagger
 * /admin/places:
 *   get:
 *     summary: Get all places (Admin only)
 *     tags: [Admin Places]
 *     responses:
 *       200:
 *         description: List of places
 */
router.get('/', authMiddleware, isAdmin, getadminPlaces);

/**
 * @swagger
 * /admin/places:
 *   post:
 *     summary: Create a new place (Admin only)
 *     tags: [Admin Places]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, location, description]
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Place created successfully
 */
router.post(
  '/',
  authMiddleware,
  isAdmin,
  createPlaceValidation,
  validateInput,
  createPlace
);

/**
 * @swagger
 * /admin/places/{id}:
 *   put:
 *     summary: Update a place by ID (Admin only)
 *     tags: [Admin Places]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Place ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Place updated successfully
 */
router.put(
  '/:id',
  authMiddleware,
  isAdmin,
  updatePlaceValidation,
  validateInput,
  updatePlace
);

/**
 * @swagger
 * /admin/places/{id}/visibility:
 *   put:
 *     summary: Toggle visibility of a place (Admin only)
 *     tags: [Admin Places]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Place ID
 *     responses:
 *       200:
 *         description: Place visibility toggled successfully
 */
router.put('/:id/visibility', authMiddleware, isAdmin, toggleVisibility);

export default router;
