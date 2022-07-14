import {Router} from 'express';
// eslint-disable-next-line max-len
import {GetPropertiesForUserAsAdminFunction} from '../types/get-properties-for-user-as-admin';
import {isLoggedIn} from '../../main/config/auth/is-logged-in';

export const configureGetPropertiesForUserAsAdminRoute = (
    router: Router,
    path: string,
    getPropertiesForUserAsAdmin: GetPropertiesForUserAsAdminFunction,
) => {
  router.get(path, isLoggedIn, async (req, res, _next) => {
    const propertiesContainer = await getPropertiesForUserAsAdmin(
        // @ts-ignore
        req.user,
    );
    return res
        .status(propertiesContainer.status)
        .json(propertiesContainer.data);
  });
};
