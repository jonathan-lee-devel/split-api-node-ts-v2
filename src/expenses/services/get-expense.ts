import {Model} from 'mongoose';
import {Expense} from '../models/Expense';
import {GetExpenseFunction} from '../types/get-expense';
import {User} from '../../users/main/models/User';
import {Property} from '../../properties/models/Property';
// eslint-disable-next-line max-len
import {returnForbidden, returnInternalServerError, returnNotFound} from '../../common/use-cases/status-data-container';

export const makeGetExpense = (
    ExpenseModel: Model<Expense>,
    PropertyModel: Model<Property>,
): GetExpenseFunction => {
  return async function getExpense(
      requestingUser: User,
      expenseId: string,
  ) {
    try {
      const expenseModel = await ExpenseModel.findOne({id: expenseId},
          {__v: 0});
      if (!expenseModel) {
        return returnNotFound();
      }

      const expensePropertyModel = await PropertyModel
          .findOne({id: expenseModel.propertyId},
              {__v: 0});
      if (!expensePropertyModel) {
        console
            .error(`Property does not exist for expense with ID: ${expenseId}`);
        return {
          status: 400,
          data: undefined,
        };
      }
      if (!expensePropertyModel
          .tenantEmails
          .includes(requestingUser.email) &&
                !expensePropertyModel
                    .administratorEmails
                    .includes(requestingUser.email)) {
        return returnForbidden();
      }

      return {
        status: 200,
        data: {
          id: expenseModel.id,
          propertyId: expenseModel.propertyId,
          title: expenseModel.title,
          amount: expenseModel.amount,
          frequency: expenseModel.frequency,
          date: expenseModel.date,
          createdByEmail: expenseModel.createdByEmail,
        },
      };
    } catch (err) {
      console.error(`An error has occurred: ${err}`);
      return returnInternalServerError();
    }
  };
};
