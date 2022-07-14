import {Router} from 'express';
// eslint-disable-next-line max-len
import {GetExpensesForPropertyFunction} from '../types/get-expenses-for-property';
import {isLoggedIn} from '../../main/config/auth/is-logged-in';

export const configureGetExpensesForPropertyRoute = (
    router: Router,
    path: string,
    getExpensesForProperty: GetExpensesForPropertyFunction,
) => {
  router.get(path, isLoggedIn, async (req, res, _next) => {
    const {propertyId} = req.params;
    // @ts-ignore
    const expenseContainer = await getExpensesForProperty(req.user, propertyId);
    return res
        .status(expenseContainer.status)
        .json(expenseContainer.data);
  });
};
