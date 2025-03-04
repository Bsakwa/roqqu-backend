"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = exports.postIdParamValidation = exports.userIdQueryValidation = exports.userIdParamValidation = exports.paginationValidation = exports.postValidation = exports.addressValidation = exports.userValidation = void 0;
const express_validator_1 = require("express-validator");
// Validation chains
exports.userValidation = [
    (0, express_validator_1.body)('username')
        .notEmpty().withMessage('Username is required')
        .isString().withMessage('Username must be a string')
        .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters'),
    (0, express_validator_1.body)('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
    (0, express_validator_1.body)('fullName')
        .notEmpty().withMessage('Full name is required')
        .isString().withMessage('Full name must be a string')
        .isLength({ min: 2, max: 100 }).withMessage('Full name must be between 2 and 100 characters'),
];
exports.addressValidation = [
    (0, express_validator_1.body)('userId')
        .notEmpty().withMessage('User ID is required')
        .isInt().withMessage('User ID must be an integer'),
    (0, express_validator_1.body)('street')
        .notEmpty().withMessage('Street is required')
        .isString().withMessage('Street must be a string'),
    (0, express_validator_1.body)('city')
        .notEmpty().withMessage('City is required')
        .isString().withMessage('City must be a string'),
    (0, express_validator_1.body)('state')
        .notEmpty().withMessage('State is required')
        .isString().withMessage('State must be a string'),
    (0, express_validator_1.body)('country')
        .notEmpty().withMessage('Country is required')
        .isString().withMessage('Country must be a string'),
    (0, express_validator_1.body)('zipCode')
        .notEmpty().withMessage('Zip code is required')
        .isString().withMessage('Zip code must be a string'),
];
exports.postValidation = [
    (0, express_validator_1.body)('userId')
        .notEmpty().withMessage('User ID is required')
        .isInt().withMessage('User ID must be an integer'),
    (0, express_validator_1.body)('title')
        .notEmpty().withMessage('Title is required')
        .isString().withMessage('Title must be a string')
        .isLength({ max: 255 }).withMessage('Title must be less than 255 characters'),
    (0, express_validator_1.body)('body')
        .notEmpty().withMessage('Body is required')
        .isString().withMessage('Body must be a string'),
];
exports.paginationValidation = [
    (0, express_validator_1.query)('pageNumber').optional().isInt({ min: 0 }).withMessage('Page number must be a non-negative integer'),
    (0, express_validator_1.query)('pageSize').optional().isInt({ min: 1, max: 100 }).withMessage('Page size must be between 1 and 100')
];
exports.userIdParamValidation = [
    (0, express_validator_1.param)('id').isInt().withMessage('User ID must be an integer')
];
exports.userIdQueryValidation = [
    (0, express_validator_1.query)('userId').isInt().withMessage('User ID must be an integer')
];
exports.postIdParamValidation = [
    (0, express_validator_1.param)('id').isInt().withMessage('Post ID must be an integer')
];
const validateRequest = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
};
exports.validateRequest = validateRequest;
