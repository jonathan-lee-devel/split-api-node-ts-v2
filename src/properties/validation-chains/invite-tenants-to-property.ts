import {body, ValidationChain} from 'express-validator';
import {verifyEmail} from '../../util/email/exports';

export const inviteTenantsToPropertyValidationChain: ValidationChain[] = [
  body('propertyId', 'Must be a valid property ID')
      .exists(),
  body('tenantEmails', 'Must be valid e-mail addresses')
      .exists()
      .custom((input) => {
        for (const email of input.toString().split(',')) {
          if (!verifyEmail(email)) {
            return false;
          }
        }
        return true;
      }),
];
