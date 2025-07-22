import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { requestGuide,cancelGuideRequest,
  editGuideRequest,
  getUserRequests,
  confirmGuideRequest,
    getGuideRequests,
  rejectGuideRequest } from '../controllers/GuidRequestController.js';
import { validateInput } from '../middlewares/validateInput.js';
import { createGuideRequestValidation, updateGuideRequestValidation } from '../validations/guideRequestValidation.js';

export const guideRequestRouter = express.Router();

// Traveller can request a guide
guideRequestRouter.post('/:guideId', createGuideRequestValidation,validateInput, authMiddleware, requestGuide);

// Traveller can cancel a guide request
guideRequestRouter.delete('/:requestId', authMiddleware, cancelGuideRequest);

// Traveller can edit his request to the same guide
guideRequestRouter.put('/:requestId', updateGuideRequestValidation, validateInput, authMiddleware, editGuideRequest);

// Traveller can view all their requests
guideRequestRouter.get('/traveller', authMiddleware, getUserRequests);

// Guide can view all their requests
guideRequestRouter.get('/all', authMiddleware, getGuideRequests);

// Guide can confirm a request
guideRequestRouter.put('/:requestId/confirm', authMiddleware, confirmGuideRequest);

// Guide can reject a request
guideRequestRouter.put('/:requestId/reject', authMiddleware, rejectGuideRequest);
