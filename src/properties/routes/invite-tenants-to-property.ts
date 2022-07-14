import {Router} from 'express';
// eslint-disable-next-line max-len
import {InviteToPropertyFunction} from '../invitations/types/invite-to-property';
import {isLoggedIn} from '../../main/config/auth/is-logged-in';
import {body} from 'express-validator';
import {VerifyEmailFunction} from '../../util/email/types/verify-email';

export const configureInviteTenantsToPropertyRoute = (
    router: Router,
    path: string,
    verifyEmail: VerifyEmailFunction,
    inviteToProperty: InviteToPropertyFunction,
) => {
  router.patch(path,
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
      isLoggedIn, async (req, res, _next) => {
        const {propertyId, tenantEmails} = req.body;
        // @ts-ignore
        const {email} = req.user;
        for (const tenantEmail of tenantEmails) {
          const propertyContainer = await inviteToProperty(
              propertyId,
              email,
              tenantEmail,
          );
          if (propertyContainer.status !== 200) {
            return res
                .status(propertyContainer.status)
                .json(propertyContainer.data);
          }
        }
        return res
            .status(200)
            .send();
      });
};
