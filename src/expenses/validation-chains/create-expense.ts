import {body, ValidationChain} from 'express-validator';
import {ExpenseFrequency} from '../enums/ExpenseFrequency';
import {isBefore} from 'date-fns';

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
  body('startDate', 'Must be a valid start date')
      .exists()
      .custom((input, {req}) => {
        try {
          const startDate = new Date(input);
          const endDate = new Date(req.body.endDate);

          return !isBefore(endDate, startDate);
        } catch (err) {
          return false;
        }
      }),
  body('endDate', 'Must be a valid end date')
      .exists()
      .custom((input) => {
        try {
          const date = new Date(input);
          return !isBefore(date, new Date());
        } catch (err) {
          return false;
        }
      }),
];
