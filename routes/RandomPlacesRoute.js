import express from 'express';
import { getRandomPlace } from '../controllers/RandomPlaceController.js'

const router = express.Router();

// Route: GET /api/places/random
router.get('/random', getRandomPlace);

export default router;
