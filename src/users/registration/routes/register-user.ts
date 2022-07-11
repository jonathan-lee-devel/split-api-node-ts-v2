import {Router} from 'express';
import {body, validationResult} from 'express-validator';
import {RegisterUserFunction} from '../types/register-user';

export const configureRegisterUserRoute = (
    router: Router,
    path: string,
    registerUser: RegisterUserFunction,
) => {
  router.post(path,
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
      async (req, res, _next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({errors: errors.array()});
        }

        const {email, firstname, lastname, password} = req.body;

        const registrationStatusContainer =
                await registerUser(
                    email,
                    firstname,
                    lastname,
                    password,
                );
        return res
            .status(registrationStatusContainer.status)
            .json(registrationStatusContainer.data);
      },
  );
};
