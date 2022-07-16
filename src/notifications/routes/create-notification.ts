import {Router} from 'express';
import {CreateNotificationFunction} from '../types/create-notification';
import {isLoggedIn} from '../../main/config/auth/is-logged-in';
import {body} from 'express-validator';

export const configureCreateNotificationRoute = (
    router: Router,
    path: string,
    createNotification: CreateNotificationFunction,
) => {
  router.post(path,
      body('userEmail', 'Must be a valid e-mail address')
          .exists()
          .isEmail(),
      body('title', 'Must be a valid title of 5-25 characters')
          .exists()
          .isLength({min: 5, max: 25}),
      body('text', 'Must be a valid text of 5-100 characters')
          .exists()
          .isLength({min: 5, max: 100}),
      isLoggedIn, async (req, res, _next) => {
        const {userEmail, title, text, buttonText, routerLink} = req.body;
        const notificationContainer = await createNotification(
            // @ts-ignore
            req.user,
            userEmail,
            title,
            text,
            routerLink,
            buttonText,
        );
        return res
            .status(notificationContainer.status)
            .json(notificationContainer.data);
      });
};
