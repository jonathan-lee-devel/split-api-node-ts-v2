import {Router} from 'express';
// eslint-disable-next-line max-len
import {GetNotificationsForUserFunction} from '../types/get-notifications-for-user';
import {isLoggedIn} from '../../main/config/auth/is-logged-in';

export const configureGetNotificationsForUserRoute = (
    router: Router,
    path: string,
    getNotificationsForUser: GetNotificationsForUserFunction,
) => {
  router.get(path, isLoggedIn, async (req, res, _next) => {
    // @ts-ignore
    const notificationsContainer = await getNotificationsForUser(req.user);
    return res
        .status(notificationsContainer.status)
        .json(notificationsContainer.data);
  });
};
