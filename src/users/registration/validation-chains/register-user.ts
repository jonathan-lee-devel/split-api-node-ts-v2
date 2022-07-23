import {body, ValidationChain} from 'express-validator';

export const registerUserValidationChain: ValidationChain[] = [
  body('email', 'Only valid e-mail addresses are allowed')
      .exists()
      .isEmail(),
  body('firstname', 'A first name must be provided')
      .exists(),
  body('lastname', 'A last name must be provided')
      .exists(),
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
