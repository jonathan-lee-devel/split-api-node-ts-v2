import {body, ValidationChain} from 'express-validator';

export const tenantLeavePropertyValidationChain: ValidationChain[] = [
  body('propertyId', 'Must be a valid property ID')
      .exists(),
];
