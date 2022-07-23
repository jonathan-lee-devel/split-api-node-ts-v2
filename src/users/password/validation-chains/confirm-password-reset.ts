import {body, ValidationChain} from 'express-validator';

export const confirmPasswordResetValidationChain: ValidationChain[] = [
  body('password', 'Passwords must match and be at least 8 characters long')
      .exists()
      .isLength({min: 8})
      .custom((input, {req}) => {
        return input === req.body.confirm_password;
      }),
  body('confirm_password',
      'Passwords must match and be at least 8 characters long')
      .exists()
      .isLength({min: 8})
      .custom((input, {req}) => {
        return input === req.body.password;
      }),
];
