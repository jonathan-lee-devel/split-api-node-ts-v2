import {body, ValidationChain} from 'express-validator';

export const deescalateTenantPrivilegesValidationChain: ValidationChain[] = [
  body('tenantEmailToDeescalate', 'Must be a valid e-mail address')
      .exists()
      .isEmail(),
];
