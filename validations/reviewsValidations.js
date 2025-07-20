import { body } from 'express-validator';

const allowedStatuses = ['happy', 'ordinary', 'sad'];

export const validateCreateReview = [
  body('status')
    .notEmpty().withMessage('Status is required')
    .isIn(allowedStatuses).withMessage(`Status must be one of: ${allowedStatuses.join(', ')}`),

  body('review')
    .notEmpty().withMessage('Review is required')
    .isString().withMessage('Review must be a string'),
];

export const validateUpdateReview = [
  body('status')
    .optional()
    .isIn(allowedStatuses).withMessage(`Status must be one of: ${allowedStatuses.join(', ')}`),

  body('review')
    .optional()
    .isString().withMessage('Review must be a string'),
];
