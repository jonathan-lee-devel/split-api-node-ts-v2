import {Router} from 'express';
import {UpdateExpenseFunction} from '../types/update-expense';
import {isLoggedIn} from '../../main/config/auth/is-logged-in';
import {isBefore} from 'date-fns';
import {body, validationResult} from 'express-validator';
import {ExpenseFrequency} from '../enums/ExpenseFrequency';

export const configureUpdateExpenseRoute = (
    router: Router,
    path: string,
    updateExpense: UpdateExpenseFunction,
) => {
  router.patch(path,
      body('propertyId', 'Must be a valid propertyId')
          .exists(),
      body('title', 'Must be a valid title of 1-30 characters')
          .exists()
          .isLength({min: 1, max: 30}),
      body('amount', 'Must be a non-negative float')
          .exists()
          .isFloat({min: 0.00}),
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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({errors: errors.array()});
        }

        const {expenseId} = req.params;
        const {
          title, amount, frequency, startDate, endDate,
        } = req.body;

        const expenseContainer = await updateExpense(
            // @ts-ignore
            req.user,
            expenseId,
            title,
            amount,
            frequency,
            startDate,
            endDate,
        );

        return res
            .status(expenseContainer.status)
            .json(expenseContainer.data);
      });
};
