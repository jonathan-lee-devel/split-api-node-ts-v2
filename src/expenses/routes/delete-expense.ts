import {Router} from 'express';
import {DeleteExpenseFunction} from '../types/delete-expense';
import {isLoggedIn} from '../../main/config/auth/is-logged-in';

export const configureDeleteExpenseRoute = (
    router: Router,
    path: string,
    deleteExpense: DeleteExpenseFunction,
) => {
  router.delete(path, isLoggedIn, async (req, res, _next) => {
    const {expenseId} = req.params;
    // @ts-ignore
    const expenseContainer = await deleteExpense(req.user, expenseId);
    return res
        .status(expenseContainer.status)
        .json(expenseContainer.data);
  });
};
