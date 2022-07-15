import {Router} from 'express';
import {GetPropertyTotalExpensesFunction} from '../types/get-property-total-expenses';
import {isLoggedIn} from '../../main/config/auth/is-logged-in';

export const configureGetPropertyTotalExpensesRoute = (
    router: Router,
    path: string,
    getPropertyTotalExpenses: GetPropertyTotalExpensesFunction,
) => {
  router.get(path, isLoggedIn, async (req, res, _next) => {
    const {propertyId} = req.params;
    const propertyContainer = await getPropertyTotalExpenses(
        // @ts-ignore
        req.user,
        propertyId,
    );
    return res
        .status(propertyContainer.status)
        .json(propertyContainer.data);
  });
};
