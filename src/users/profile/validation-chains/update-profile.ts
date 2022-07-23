import {body, ValidationChain} from 'express-validator';

export const updateProfileValidationChain: ValidationChain[] = [
  body('firstname', 'A first name must be provided')
      .exists(),
  body('lastname', 'A last name must be provided')
      .exists(),
];
