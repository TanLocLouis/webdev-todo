import { body, param, query } from 'express-validator';

export const taskIdValidator = [
  param('id')
    .isMongoId()
    .withMessage('Invalid task ID format'),
];

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

export const updateTaskValidator = [
  ...taskIdValidator,
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
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

export const listTasksValidator = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer')
    .toInt(),
  query('limit')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Limit must be a positive integer')
    .toInt(),
  query('completed')
    .optional()
    .isBoolean()
    .withMessage('Completed must be a boolean'),
  query('search')
    .optional()
    .isString()
    .withMessage('Search term must be a string'),
];
