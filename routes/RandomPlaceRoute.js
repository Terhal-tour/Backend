import express from 'express';
import { getRandomPlace } from '../controllers/RandomPlaceController.js'

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Random Place
 *   description: Get random tourist places
 */

/**
 * @swagger
 * /places/random:
 *   get:
 *     summary: Get a random tourist place
 *     tags: [Random Place]
 *     responses:
 *       200:
 *         description: Random place returned successfully
 *       500:
 *         description: Server error
 */
router.get('/random', getRandomPlace);

export default router;