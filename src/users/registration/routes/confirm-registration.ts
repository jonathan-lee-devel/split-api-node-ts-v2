import {Router} from 'express';
import {ConfirmRegistrationFunction} from '../types/confirm-registration';

export const configureConfirmRegistrationRoute = (
    router: Router,
    path: string,
    confirmRegistration: ConfirmRegistrationFunction,
) => {
  router.get(path, async (req, res, _next) => {
    const {tokenValue} = req.params;
    const confirmRegistrationContainer = await confirmRegistration(tokenValue);
    return res
        .status(confirmRegistrationContainer.status)
        .json(confirmRegistrationContainer.data);
  });
};
