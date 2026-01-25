import express from "express";
import {
  handleSearchPlaces,
  handleGetTopPlaces,
  handleSuggestedOrAllPlaces,
  handleGetPlaceById,
  handleGetPlacesNearby,
  getAllPlaces,
} from "../controllers/placesController.js";
import { optionalAuthMiddleware } from "../middlewares/optionalAuthMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Places
 *   description: Tourist places management
 */

/**
 * @swagger
 * /places:
 *   get:
 *     summary: Get all places
 *     tags: [Places]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           example: 1
 *     responses:
 *       200:
 *         description: List of places
 */
router.get('/', getAllPlaces);

/**
 * @swagger
 * /places/search:
 *   get:
 *     summary: Search places by name or category
 *     tags: [Places]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         required: true
 *         schema:
 *           type: string
 *           example: pyramids
 *     responses:
 *       200:
 *         description: Search results
 *       400:
 *         description: Missing search keyword
 */
router.get("/search", handleSearchPlaces);

/**
 * @swagger
 * /places/top:
 *   get:
 *     summary: Get top rated places
 *     tags: [Places]
 *     responses:
 *       200:
 *         description: Top places list
 */
router.get("/top", handleGetTopPlaces);

/**
 * @swagger
 * /places/suggested:
 *   get:
 *     summary: Get suggested places for logged-in users or all places for guests
 *     tags: [Places]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Suggested or all places
 */
router.get("/suggested", optionalAuthMiddleware, handleSuggestedOrAllPlaces);

/**
 * @swagger
 * /places/nearby:
 *   get:
 *     summary: Get nearby places based on user location
 *     tags: [Places]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: radius
 *         schema:
 *           type: number
 *           example: 10
 *     responses:
 *       200:
 *         description: Nearby places
 *       401:
 *         description: Unauthorized
 */
router.get("/nearby", authMiddleware, handleGetPlacesNearby);

/**
 * @swagger
 * /places/{id}:
 *   get:
 *     summary: Get place details by ID and add it to user history
 *     tags: [Places]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 65cfa12e8f2b4a0012abc123
 *     responses:
 *       200:
 *         description: Place details
 *       404:
 *         description: Place not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", authMiddleware, handleGetPlaceById);

export default router;
