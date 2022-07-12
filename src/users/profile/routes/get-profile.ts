import {Router} from 'express';
import {GetProfileFunction} from '../types/get-profile';
import {isLoggedIn} from '../../../main/config/auth/is-logged-in';

export const configureGetProfileRoute = (
    router: Router,
    path: string,
    getProfile: GetProfileFunction,
) => {
  router.get(path, isLoggedIn, async (req, res, _next) => {
    // @ts-ignore
    const {email} = req.user;

    // @ts-ignore
    const profileContainer = await getProfile(req.user, email);

    return res
        .status(profileContainer.status)
        .json(profileContainer.data);
  });
};
