import { body } from 'express-validator';

export const createAdminValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required'),

  body('email')
    .isEmail().withMessage('Invalid email format')
    .custom(email => {
      const tempDomains = ['tempmail.com', '10minutemail.com', 'mailinator.com'];
      const domain = email.split('@')[1];
      if (tempDomains.includes(domain)) {
        throw new Error('Temporary emails are not allowed');
      }
      return true;
    }),

  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  body('isSuper')
    .optional()
    .isBoolean().withMessage('isSuper must be a boolean'),
];

export const updateAdminValidation = [
  body('name')
    .optional()
    .trim()
    .notEmpty().withMessage('Name cant be empty'),

  body('email')
    .optional()
    .isEmail().withMessage('Invalid email format')
    .custom(email => {
      const tempDomains = ['tempmail.com', '10minutemail.com', 'mailinator.com'];
      const domain = email.split('@')[1];
      if (tempDomains.includes(domain)) {
        throw new Error('Temporary emails are not allowed');
      }
      return true;
    }),

  body('password')
    .optional()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  body('isSuper')
    .optional()
    .isBoolean().withMessage('isSuper must be a boolean'),
];
