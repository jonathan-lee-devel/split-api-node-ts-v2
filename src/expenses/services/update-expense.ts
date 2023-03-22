import bunyan from 'bunyan';
import {Model} from 'mongoose';
import Dinero from 'dinero.js';
import {UpdateExpenseFunction} from '../types/update-expense';
import {User} from '../../users/main/models/User';
import {ExpenseFrequency} from '../enums/ExpenseFrequency';
import {Expense} from '../models/Expense';
import {Property} from '../../properties/models/Property';
import {returnForbidden, returnInternalServerError, returnNotFound} from '../../common/use-cases/status-data-container';

export const makeUpdateExpense = (
    logger: bunyan,
    ExpenseModel: Model<Expense>,
    PropertyModel: Model<Property>,
): UpdateExpenseFunction => {
  return async function updateExpense(
      requestingUser: User,
      expenseId: string,
      title: string,
      amount: string,
      frequency: ExpenseFrequency,
      date: Date,
  ) {
    try {
      const expenseModel = await ExpenseModel
          .findOne({id: expenseId}, {__v: 0});
      if (!expenseModel) {
        return returnNotFound();
      }

      const propertyModel = await PropertyModel
          .findOne({id: expenseModel.propertyId}, {__v: 0});
      if (!propertyModel) {
        logger
            .error(`Property: ${expenseModel.propertyId} does not exist for expense: ${expenseId}`);
        return returnInternalServerError();
      }
      if (!propertyModel.administratorEmails.includes(requestingUser.email)) {
        return returnForbidden();
      }

      expenseModel.title = title;
      // eslint-disable-next-line new-cap
      expenseModel.amount = Dinero({amount: Number(amount) * 100, currency: 'EUR', precision: 2}).toFormat();
      expenseModel.frequency = frequency;
      expenseModel.date = date;
      await expenseModel.save();
      return {
        status: 204,
        data: undefined,
      };
    } catch (err) {
      logger.error(`An error has occurred: ${err}`);
      return returnInternalServerError();
    }
  };
};
