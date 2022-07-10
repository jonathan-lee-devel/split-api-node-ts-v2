import {Router} from 'express';
import {CreatePropertyFunction} from '../types/create-property';
import {isLoggedIn} from '../../main/config/auth/is-logged-in';
import {body} from 'express-validator';
import {VerifyEmailFunction} from '../../util/email/types/verify-email';

export const configureCreatePropertyRoute = (
    router: Router,
    path: string,
    verifyEmail: VerifyEmailFunction,
    createProperty: CreatePropertyFunction,
) => {
  router.post(path,
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
      body('administratorEmails', 'Only valid e-mail addresses are allowed')
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
        const {title, tenantEmails, administratorEmails} = req.body;
        const propertyContainer = await createProperty(
            // @ts-ignore
            req.user,
            title,
            tenantEmails,
            administratorEmails,
        );
        return res
            .status(propertyContainer.status)
            .json(propertyContainer.data);
      });
};
