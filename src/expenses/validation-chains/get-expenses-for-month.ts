import {body, ValidationChain} from 'express-validator';

export const getExpensesForMonthValidationChain: ValidationChain[] = [
  body('propertyId', 'Must be a valid property ID')
      .exists(),
  body('month', 'Must be a valid month int value')
      .exists()
      .isInt({min: 0, max: 11}),
  body('year', 'Must be a valid year int value')
      .exists()
      .isInt({min: 0}),
];
