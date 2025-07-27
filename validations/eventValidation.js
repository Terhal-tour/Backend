import { body } from 'express-validator';

export const createEventValidation = [
  body('name')
    .notEmpty().withMessage('name is required')
    .isString().withMessage('name must be string'),

  body('description')
    .optional()
    .isString().withMessage('description must be string'),

  body('location')
    .notEmpty().withMessage('location is required')
    .isString().withMessage('location must be string'),

  body('address')
    .notEmpty().withMessage('address is required')
    .isString().withMessage('address must be string'),

  body('category')
    .notEmpty().withMessage('category is required')
    .isString().withMessage('category must be string'),

  body('coordinates')
    .notEmpty().withMessage('coordinates required')
    .matches(/^[-+]?[0-9]*\.?[0-9]+,[-+]?[0-9]*\.?[0-9]+$/)
    .withMessage('coordinates must be in "lat,lng" format'),

  body('startTime')
    .notEmpty().withMessage('start time is required')
    .isISO8601().withMessage('start time must be a valid ISO 8601 date')
    .custom((value) => {
      const start = new Date(value);
      const now = new Date();
      if (start < now) {
        throw new Error('start time cannot be in the past');
      }
      return true;
    }),

  body('endTime')
    .notEmpty().withMessage('end time is required')
    .isISO8601().withMessage('end time must be a valid ISO 8601 date')
    .custom((value, { req }) => {
      const start = new Date(req.body.startTime);
      const end = new Date(value);
      if (end <= start) {
        throw new Error('end time must be after start time');
      }
      return true;
    }),
];

export const updateEventValidation = [
  body('name')
    .optional()
    .isString().withMessage('name must be string'),

  body('description')
    .optional()
    .isString().withMessage('description must be string'),

  body('location')
    .optional()
    .isString().withMessage('location must be string'),

  body('address')
    .optional()
    .isString().withMessage('address must be string'),

  body('category')
    .optional()
    .isString().withMessage('category must be string'),

  body('coordinates')
    .optional()
    .matches(/^[-+]?[0-9]*\.?[0-9]+,[-+]?[0-9]*\.?[0-9]+$/)
    .withMessage('coordinates must be in "lat,lng" format'),
  body('startTime')
    .optional()
    .isISO8601().withMessage('start time must be a valid ISO 8601 date')
    .custom((value) => {
      const start = new Date(value);
      const now = new Date();
      if (start < now) {
        throw new Error('start time cannot be in the past');
      }
      return true;
    }), 

  body('endTime')
    .optional()
    .isISO8601().withMessage('end time must be a valid ISO 8601 date')
    .custom((value, { req }) => {
      const start = new Date(req.body.startTime);
      const end = new Date(value);
      if (end <= start) {
        throw new Error('end time must be after start time');
      }
      return true;
    }),
];
