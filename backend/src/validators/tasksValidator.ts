import { body } from 'express-validator';

export const createTaskValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),
  body('completed')
    .optional()
    .isBoolean()
    .withMessage('Completed must be a boolean'),
];
