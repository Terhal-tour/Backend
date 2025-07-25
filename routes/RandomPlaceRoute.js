// routes/placeRoutes.js
import express from 'express';
import { getRandomPlace } from '../controllers/RandomPlaceController.js'

const router = express.Router();

router.get('/random', getRandomPlace);

export default router;
