import {body, ValidationChain} from 'express-validator';

export const removeTenantFromPropertyValidationChain: ValidationChain[] = [
  body('propertyId', 'Must be a valid property ID')
      .exists(),
  body('tenantEmailToRemove', 'Must be a valid e-mail address')
      .exists()
      .isEmail(),
];
