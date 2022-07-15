import {Router} from 'express';
import {isLoggedIn} from '../../main/config/auth/is-logged-in';
// eslint-disable-next-line max-len
import {GetPropertyTotalExpensesPerTenantFunction} from '../types/get-property-total-expenses-per-tenant-function';

export const configureGetPropertyTotalExpensesPerTenantRoute = (
    router: Router,
    path: string,
    getPropertyTotalExpensesPerTenant
        : GetPropertyTotalExpensesPerTenantFunction,
) => {
  router.get(path, isLoggedIn, async (req, res, _next) => {
    const {propertyId} = req.params;
    const propertyContainer =
            await getPropertyTotalExpensesPerTenant(
                // @ts-ignore
                req.user,
                propertyId,
            );
    return res
        .status(propertyContainer.status)
        .json(propertyContainer.data);
  });
};
