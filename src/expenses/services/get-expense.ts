import {Model} from 'mongoose';
import {Expense} from '../models/Expense';
import {GetExpenseFunction} from '../types/get-expense';
import {User} from '../../users/main/models/User';
import {Property} from '../../properties/models/Property';

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
        return {
          status: 404,
          data: undefined,
        };
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
        return {
          status: 403,
          data: undefined,
        };
      }

      return {
        status: 200,
        data: {
          ...expenseModel,
        },
      };
    } catch (err) {
      console.error(`An error has occurred: ${err}`);
      return {
        status: 500,
        data: undefined,
      };
    }
  };
};
