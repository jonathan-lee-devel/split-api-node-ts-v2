import {Router} from 'express';
import {GetExpenseFunction} from '../types/get-expense';
import {isLoggedIn} from '../../main/config/auth/is-logged-in';

export const configureGetExpenseRoute = (
    router: Router,
    path: string,
    getExpense: GetExpenseFunction,
) => {
  router.get(path, isLoggedIn, async (req, res, _next) => {
    const expenseContainer = await getExpense(
        // @ts-ignore
        req.user,
        req.params.expenseId,
    );
    return res
        .status(expenseContainer.status)
        .json(expenseContainer.data);
  });
};
