import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {UpdateExpenseFunction} from '../types/update-expense';
import {User} from '../../users/main/models/User';
import {ExpenseFrequency} from '../enums/ExpenseFrequency';
import {Expense} from '../models/Expense';
import {Property} from '../../properties/models/Property';
import Dinero from 'dinero.js';

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
      startDate: Date,
      endDate: Date,
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
            .error(`Property: ${expenseModel.propertyId} does not exist for expense: ${expenseId}`);
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

      expenseModel.title = title;
      // eslint-disable-next-line max-len,new-cap
      expenseModel.amount = Dinero({amount: Number(amount) * 100, currency: 'EUR', precision: 2}).toFormat();
      expenseModel.frequency = frequency;
      expenseModel.startDate = startDate;
      expenseModel.endDate = endDate;
      await expenseModel.save();
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
