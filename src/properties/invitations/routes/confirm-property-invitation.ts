import {Router} from 'express';
// eslint-disable-next-line max-len
import {ConfirmPropertyInvitationFunction} from '../types/confirm-property-invitation';

export const configureConfirmPropertyInvitationRoute = (
    router: Router,
    path: string,
    confirmPropertyInvitation: ConfirmPropertyInvitationFunction,
) => {
  router.get(path,
      async (req, res, _next) => {
        const propertyInvitationStatusContainer =
                await confirmPropertyInvitation(req.params.tokenValue);
        return res
            .status(propertyInvitationStatusContainer.status)
            .json(propertyInvitationStatusContainer.data);
      });
};
