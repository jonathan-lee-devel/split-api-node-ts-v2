import {Router} from 'express';
import {body} from 'express-validator';
// eslint-disable-next-line max-len
import {RemoveTenantFromPropertyFunction} from '../types/remove-tenant-from-property';
import {isLoggedIn} from '../../main/config/auth/is-logged-in';

export const configureTenantLeavePropertyRoute = (
    router: Router,
    path: string,
    removeTenantFromProperty: RemoveTenantFromPropertyFunction,
) => {
  router.patch(path,
      body('propertyId', 'Must be a valid property ID')
          .exists(),
      isLoggedIn, async (req, res, _next) => {
        const {propertyId} = req.body;
        // @ts-ignore
        const {email} = req.user;
        const propertyContainer = await removeTenantFromProperty(
            // @ts-ignore
            req.user,
            propertyId,
            email,
        );
        return res
            .status(propertyContainer.status)
            .json(propertyContainer.data);
      });
};
