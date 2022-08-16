import {body, ValidationChain} from 'express-validator';

export const getPropertyTotalExpensesPerTenantValidationChain
    : ValidationChain[] = [
      body('month', 'Must be a valid month int value')
          .exists()
          .isInt({min: 0, max: 11}),
      body('year', 'Must be a valid year int value')
          .exists()
          .isInt({min: 0}),
    ];
