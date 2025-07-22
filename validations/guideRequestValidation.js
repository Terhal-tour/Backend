// validations/guideRequest.validation.js
import { body } from 'express-validator';

export const createGuideRequestValidation = [
  body('userName')
    .notEmpty().withMessage('User name is required'),

  body('userEmail')
    .isEmail().withMessage('A valid email is required'),

  body('message')
    .notEmpty().withMessage('Message is required'),

  body('date')
    .notEmpty().withMessage('Date is required')
    .isISO8601().withMessage('Invalid date format'),

  body('duration')
    .notEmpty().withMessage('Duration is required'),

  body('groupSize')
    .optional()
    .isInt({ min: 1 }).withMessage('Group size must be at least 1'),

 
];

export const updateGuideRequestValidation = [
  body('message')
    .optional()
    .isString().withMessage('Message must be a string'),

  body('date')
    .optional()
    .isISO8601().withMessage('Invalid date format'),

  body('duration')
    .optional()
    .isString().withMessage('Duration must be a string'),

  body('groupSize')
    .optional()
    .isInt({ min: 1 }).withMessage('Group size must be at least 1'),
];
