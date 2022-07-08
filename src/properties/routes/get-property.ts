import {Router} from 'express';
import {GetPropertyFunction} from '../types/get-property';
import {isLoggedIn} from '../../config/auth/is-logged-in';

export const configureGetPropertyRoute = (
    router: Router,
    path: string,
    getProperty: GetPropertyFunction,
) => {
  router.get(path, isLoggedIn, async (req, res, _next) => {
    const propertyContainer = await getProperty(
        // @ts-ignore
        req.user,
        req.params.propertyId,
    );
    return res
        .status(propertyContainer.status)
        .json(propertyContainer.data);
  });
};
