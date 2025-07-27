import { body } from 'express-validator';

export const createCategoryValidation = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 3, max: 20 }).withMessage('Title must be between 3 and 20 characters')
    .matches(/^[A-Za-z\u0600-\u06FF\s]+$/).withMessage('Title must contain only letters'),
];

export const updateCategoryValidation = [
    body('title')
        .notEmpty().withMessage('name is required')
        .isString().withMessage('name must be string'),
];
