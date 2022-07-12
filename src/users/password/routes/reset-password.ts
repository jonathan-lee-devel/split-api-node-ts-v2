import {Router} from 'express';
import {ResetPasswordFunction} from '../types/reset-password';
import {body, validationResult} from 'express-validator';

export const configureResetPasswordRoute = (
    router: Router,
    path: string,
    resetPassword: ResetPasswordFunction,
) => {
  router.post(path,
      body('email', 'Only valid e-mail addresses are allowed')
          .exists()
          .isEmail(),
      async (req, res, _next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({errors: errors.array()});
        }

        const {email} = req.body;
        const passwordResetContainer = await resetPassword(email);

        return res
            .status(passwordResetContainer.status)
            .json(passwordResetContainer.data);
      });
};
