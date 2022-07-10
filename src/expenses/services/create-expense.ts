import {GenerateIdFunction} from '../../util/id/types/generate-id';
import {Model} from 'mongoose';
import {Expense} from '../models/Expense';
import {CreateExpenseFunction} from '../types/create-expense';
import {User} from '../../users/models/User';
import {Dinero} from 'dinero.js';
import {ExpenseFrequency} from '../enums/ExpenseFrequency';
import {DEFAULT_ID_LENGTH} from '../../util/id/constants/default-id-length';

export const makeCreateExpense = (
    generateId: GenerateIdFunction,
    ExpenseModel: Model<Expense>,
): CreateExpenseFunction => {
  return async function createExpense(
      requestingUser: User,
      propertyId: string,
      title: string,
      amount: Dinero,
      frequency: ExpenseFrequency,
      startDate: Date,
      endDate: Date,
  ) {
    const id = await generateId(DEFAULT_ID_LENGTH);
    const createdByEmail = requestingUser.email;
    const expense: Expense = {
      id,
      propertyId,
      title,
      amount: amount.toFormat(),
      frequency,
      startDate,
      endDate,
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
      console.error(`An error has occurred: ${err}`);
      return {
        status: 500,
        data: undefined,
      };
    }
  };
};
