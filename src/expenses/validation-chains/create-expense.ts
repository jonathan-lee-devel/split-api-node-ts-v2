import {body, ValidationChain} from 'express-validator';
import {ExpenseFrequency} from '../enums/ExpenseFrequency';

export const createExpenseValidationChain: ValidationChain[] = [
  body('propertyId', 'Must be a valid property ID')
      .exists(),
  body('title', 'Must be a valid title of 1-30 characters')
      .exists()
      .isLength({min: 1, max: 30}),
  body('amount', 'Must be a non-negative integer')
      .exists()
      .isInt({min: 0}),
  body('frequency', 'Must be a valid frequency')
      .exists()
      .isInt({min: ExpenseFrequency.ONCE, max: ExpenseFrequency.YEARLY}),
  body('date', 'Must be a valid date from the current month')
      .exists()
      .custom((_input, {req}) => {
        const inputDate = new Date(req.body.date);
        const currentDate = new Date();
        return inputDate.getMonth() === currentDate.getMonth();
      }),
];
