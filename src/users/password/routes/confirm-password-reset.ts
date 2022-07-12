import {Router} from 'express';
import {ConfirmPasswordResetFunction} from '../types/confirm-password-reset';
import {body} from 'express-validator';

export const configureConfirmPasswordResetRoute = (
    router: Router,
    path: string,
    confirmPasswordReset: ConfirmPasswordResetFunction,
) => {
  router.post(path,
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
        const {tokenValue} = req.params;
        const {password} = req.body;
        const passwordResetContainer = await confirmPasswordReset(
            tokenValue,
            password,
        );

        return res
            .status(passwordResetContainer.status)
            .json(passwordResetContainer.data);
      });
};
