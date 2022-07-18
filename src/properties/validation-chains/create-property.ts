import {body, ValidationChain} from 'express-validator';
import {verifyEmail} from '../../util/email/exports';

export const createPropertyValidationChain: ValidationChain[] = [
  body('title', 'Must be a valid title between 5-25 characters')
      .exists()
      .isLength({min: 5, max: 25}),
  body('tenantEmails', 'Only valid e-mail addresses are allowed')
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
