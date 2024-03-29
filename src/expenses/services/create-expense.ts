import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {GenerateIdFunction} from '../../util/id/types/generate-id';
import {Expense} from '../models/Expense';
import {CreateExpenseFunction} from '../types/create-expense';
import {User} from '../../users/main/models/User';
import {ExpenseFrequency} from '../enums/ExpenseFrequency';
import {DEFAULT_ID_LENGTH} from '../../util/id/constants/default-id-length';
import {Property} from '../../properties/models/Property';
import {newDineroAmount} from '../../common/use-cases/dinero';
import {HttpStatus} from '../../common/enums/HttpStatus';

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
        status: HttpStatus.BAD_REQUEST,
        data: undefined,
      };
    }
    const createdByEmail = requestingUser.email;
    const dineroAmount = newDineroAmount(amount / 100);
    const expense: Expense = {
      id: await generateId(DEFAULT_ID_LENGTH),
      propertyId,
      title,
      amount: dineroAmount.toFormat(),
      frequency,
      date,
      createdByEmail,
    };

    await new ExpenseModel(expense).save();
    return {
      status: HttpStatus.CREATED,
      data: {
        ...expense,
      },
    };
  };
};
