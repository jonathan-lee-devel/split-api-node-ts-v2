import bunyan from 'bunyan';
import {Model} from 'mongoose';
import Dinero from 'dinero.js';
import {GenerateIdFunction} from '../../util/id/types/generate-id';
import {Expense} from '../models/Expense';
import {CreateExpenseFunction} from '../types/create-expense';
import {User} from '../../users/main/models/User';
import {ExpenseFrequency} from '../enums/ExpenseFrequency';
import {DEFAULT_ID_LENGTH} from '../../util/id/constants/default-id-length';
import {Property} from '../../properties/models/Property';

export const makeCreateExpense = (
    logger: bunyan,
    generateId: GenerateIdFunction,
    PropertyModel: Model<Property>,
    ExpenseModel: Model<Expense>,
): CreateExpenseFunction => {
  return async function createExpense(
      requestingUser: User,
      propertyId: string,
      title: string,
      amount: number,
      frequency: ExpenseFrequency,
      date: Date,
  ) {
    const propertyModel = await PropertyModel
        .findOne({id: propertyId}, {__v: 0});
    if (!propertyModel) {
      return {
        status: 400,
        data: undefined,
      };
    }
    const createdByEmail = requestingUser.email;
    // eslint-disable-next-line new-cap
    const dineroAmount = Dinero({
      amount,
      currency: 'EUR',
      precision: 2,
    });
    const expense: Expense = {
      id: await generateId(DEFAULT_ID_LENGTH),
      propertyId,
      title,
      amount: dineroAmount.toFormat(),
      frequency,
      date,
      createdByEmail,
    };

    try {
      await new ExpenseModel(expense).save();
      return {
        status: 201,
        data: {
          ...expense,
        },
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
