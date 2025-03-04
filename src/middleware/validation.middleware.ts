import { Request, Response, NextFunction } from 'express';
import { body, param, query, validationResult } from 'express-validator';

// Validation chains
export const userValidation = [
  body('username')
    .notEmpty().withMessage('Username is required')
    .isString().withMessage('Username must be a string')
    .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters'),
  
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),
  
  body('fullName')
    .notEmpty().withMessage('Full name is required')
    .isString().withMessage('Full name must be a string')
    .isLength({ min: 2, max: 100 }).withMessage('Full name must be between 2 and 100 characters'),
];

export const addressValidation = [
  body('userId')
    .notEmpty().withMessage('User ID is required')
    .isInt().withMessage('User ID must be an integer'),
  
  body('street')
    .notEmpty().withMessage('Street is required')
    .isString().withMessage('Street must be a string'),
  
  body('city')
    .notEmpty().withMessage('City is required')
    .isString().withMessage('City must be a string'),
  
  body('state')
    .notEmpty().withMessage('State is required')
    .isString().withMessage('State must be a string'),
  
  body('country')
    .notEmpty().withMessage('Country is required')
    .isString().withMessage('Country must be a string'),
  
  body('zipCode')
    .notEmpty().withMessage('Zip code is required')
    .isString().withMessage('Zip code must be a string'),
];

export const postValidation = [
  body('userId')
    .notEmpty().withMessage('User ID is required')
    .isInt().withMessage('User ID must be an integer'),
  
  body('title')
    .notEmpty().withMessage('Title is required')
    .isString().withMessage('Title must be a string')
    .isLength({ max: 255 }).withMessage('Title must be less than 255 characters'),
  
  body('body')
    .notEmpty().withMessage('Body is required')
    .isString().withMessage('Body must be a string'),
];

export const paginationValidation = [
  query('pageNumber').optional().isInt({ min: 0 }).withMessage('Page number must be a non-negative integer'),
  query('pageSize').optional().isInt({ min: 1, max: 100 }).withMessage('Page size must be between 1 and 100')
];

export const userIdParamValidation = [
  param('id').isInt().withMessage('User ID must be an integer')
];

export const userIdQueryValidation = [
  query('userId').isInt().withMessage('User ID must be an integer')
];

export const postIdParamValidation = [
  param('id').isInt().withMessage('Post ID must be an integer')
];

export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  
  next();
};
