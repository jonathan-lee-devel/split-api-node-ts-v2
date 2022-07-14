import {Router} from 'express';
// eslint-disable-next-line max-len
import {isLoggedIn} from '../../main/config/auth/is-logged-in';
// eslint-disable-next-line max-len
import {GetPropertiesForUserAsTenantFunction} from '../types/get-properties-for-user-as-tenant';

export const configureGetPropertiesForUserAsTenantRoute = (
    router: Router,
    path: string,
    getPropertiesForUserAsTenant: GetPropertiesForUserAsTenantFunction,
) => {
  router.get(path, isLoggedIn, async (req, res, _next) => {
    const propertiesContainer = await getPropertiesForUserAsTenant(
        // @ts-ignore
        req.user,
    );
    return res
        .status(propertiesContainer.status)
        .json(propertiesContainer.data);
  });
};
