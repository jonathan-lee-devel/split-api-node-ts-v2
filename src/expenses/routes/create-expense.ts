import {Router} from 'express';
import Dinero from 'dinero.js';
import {body} from 'express-validator';
import {CreateExpenseFunction} from '../types/create-expense';
import {isLoggedIn} from '../../main/config/auth/is-logged-in';
import {ExpenseFrequency} from '../enums/ExpenseFrequency';
import {isBefore} from 'date-fns';

export const configureCreateExpenseRoute = (
    router: Router,
    path: string,
    createExpense: CreateExpenseFunction,
) => {
  router.post(path,
      body('propertyId', 'Must be a valid property ID')
          .exists(),
      body('title', 'Must be a valid title between 5-25 characters')
          .exists()
          .isLength({min: 5, max: 25}),
      body('amount', 'Must be a non-negative integer')
          .exists()
          .isInt({min: 0}),
      body('frequency', 'Must be a valid frequency')
          .exists()
          .isInt({min: ExpenseFrequency.ONCE, max: ExpenseFrequency.YEARLY}),
      body('startDate', 'Must be a valid start date')
          .exists()
          .custom((input, {req}) => {
            try {
              const startDate = new Date(input);
              const endDate = new Date(req.body.endDate);

              return !isBefore(endDate, startDate);
            } catch (err) {
              return false;
            }
          }),
      body('endDate', 'Must be a valid end date')
          .exists()
          .custom((input) => {
            try {
              const date = new Date(input);
              return !isBefore(date, new Date());
            } catch (err) {
              return false;
            }
          }),
      isLoggedIn, async (req, res, _next) => {
        const {
          propertyId, title, amount, frequency, startDate, endDate,
        } = req.body;
        // eslint-disable-next-line new-cap
        const dineroAmount = Dinero({amount, currency: 'EUR', precision: 2});
        const expenseContainer = await createExpense(
            // @ts-ignore
            req.user,
            propertyId,
            title,
            dineroAmount,
            frequency,
            startDate,
            endDate,
        );
        return res
            .status(expenseContainer.status)
            .json(expenseContainer.data);
      });
};
