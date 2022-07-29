import {body, ValidationChain} from 'express-validator';

export const createExpenseDistributionAssignmentValidationChain
    : ValidationChain[] = [
      body('expenseId', 'Must be a valid expense ID')
          .exists(),
      body('tenantEmail', 'Must be a valid email address')
          .exists()
          .isEmail(),
      body('amount', 'Must be a non-negative integer')
          .exists()
          .isInt({min: 0}),
    ];
