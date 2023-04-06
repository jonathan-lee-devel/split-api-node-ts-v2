import {body, ValidationChain} from 'express-validator';

export const escalateTenantPrivilegesValidationChain: ValidationChain[] = [
  body('tenantEmailToEscalate', 'Must be a valid e-mail address')
      .exists()
      .isEmail(),
];
