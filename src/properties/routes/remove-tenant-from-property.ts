import {Router} from 'express';
// eslint-disable-next-line max-len
import {RemoveTenantFromPropertyFunction} from '../types/remove-tenant-from-property';
import {isLoggedIn} from '../../main/config/auth/is-logged-in';
import {body} from 'express-validator';

export const configureRemoveTenantFromPropertyRoute = (
    router: Router,
    path: string,
    removeTenantFromProperty: RemoveTenantFromPropertyFunction,
) => {
  router.patch(path,
      body('propertyId', 'Must be a valid property ID')
          .exists(),
      body('tenantEmailToRemove', 'Must be a valid e-mail address')
          .exists()
          .isEmail(),
      isLoggedIn, async (req, res, _next) => {
        const {propertyId, tenantEmailToRemove} = req.body;
        const propertyContainer = await removeTenantFromProperty(
            // @ts-ignore
            req.user,
            propertyId,
            tenantEmailToRemove,
        );
        return res
            .status(propertyContainer.status)
            .json(propertyContainer.data);
      });
};
