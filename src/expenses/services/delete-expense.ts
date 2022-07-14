import {DeleteExpenseFunction} from '../types/delete-expense';
import {User} from '../../users/main/models/User';
import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Expense} from '../models/Expense';
import {Property} from '../../properties/models/Property';

export const makeDeleteExpense = (
    logger: bunyan,
    ExpenseModel: Model<Expense>,
    PropertyModel: Model<Property>,
): DeleteExpenseFunction => {
  return async function deleteExpense(
      requestingUser: User,
      expenseId: string,
  ) {
    try {
      const expenseModel = await ExpenseModel
          .findOne({id: expenseId}, {__v: 0});
      if (!expenseModel) {
        return {
          status: 404,
          data: undefined,
        };
      }

      const propertyModel = await PropertyModel
          .findOne({id: expenseModel.propertyId}, {__v: 0});
      if (!propertyModel) {
        logger
            // eslint-disable-next-line max-len
            .error(`Attempting to delete expense: ${expenseId} for which property does not exist`);
        return {
          status: 500,
          data: undefined,
        };
      }

      if (!propertyModel.administratorEmails.includes(requestingUser.email)) {
        return {
          status: 403,
          data: undefined,
        };
      }

      await ExpenseModel.deleteOne({id: expenseId});
      return {
        status: 204,
        data: undefined,
      };
    } catch (err) {
      logger.error(`An error has occurred: ${err}`);
      return {
        status: 500,
        data: undefined,
      };
    }
  };
};
