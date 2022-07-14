import {Router} from 'express';
import {isLoggedIn} from '../../main/config/auth/is-logged-in';
import {GetPropertyIsAdminFunction} from '../types/get-property-is-admin';

export const configureGetPropertyIsAdminRoute = (
    router: Router,
    path: string,
    getPropertyIsAdmin: GetPropertyIsAdminFunction,
) => {
  router.get(path, isLoggedIn, async (req, res, _next) => {
    const {propertyId} = req.params;
    const isAdmin = await getPropertyIsAdmin(
        // @ts-ignore
        req.user,
        propertyId,
    );
    return res
        .status(200)
        .json(isAdmin);
  });
};
