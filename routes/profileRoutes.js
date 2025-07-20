import express from 'express';
import { getUser, updateUser } from '../controllers/profileController.js';
import { upload } from '../middlewares/upload.js'
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = express.Router();
// Get user profile
router.use(authMiddleware);
router.get('/me', getUser);
// Update user profile
router.put('/update', upload.single('image'), updateUser );
export default router;