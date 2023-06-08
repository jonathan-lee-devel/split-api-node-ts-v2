import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Expense} from '../models/Expense';
import {GetExpensesForPropertyFunction} from '../types/get-expenses-for-property';
import {User} from '../../users/main/models/User';
import {Property} from '../../properties/models/Property';
import {ExpenseDto} from '../dtos/ExpenseDto';
import {returnForbidden, returnNotFound} from '../../common/use-cases/status-data-container';
import {HttpStatus} from '../../common/enums/HttpStatus';

export const makeGetExpensesForProperty = (
    logger: bunyan,
    PropertyModel: Model<Property>,
    ExpenseModel: Model<Expense>,
): GetExpensesForPropertyFunction => {
  return async function getExpensesForProperty(
      requestingUser: User,
      propertyId: string,
  ) {
    const propertyModel = await PropertyModel
        .findOne({id: propertyId}, {__v: 0});
    if (!propertyModel) {
      return returnNotFound();
    }
    if (!propertyModel.administratorEmails.includes(requestingUser.email) &&
            !propertyModel.tenantEmails.includes(requestingUser.email)) {
      return returnForbidden();
    }

    const expenseModels = await ExpenseModel.find({propertyId}, {__v: 0});
    const transformedExpenses: ExpenseDto[] = [];
    for (const expense of expenseModels) {
      transformedExpenses.push({
        id: (await expense).id,
        propertyId,
        title: (await expense).title,
        amount: (await expense).amount,
        frequency: (await expense).frequency,
        date: (await expense).date,
        createdByEmail: (await expense).createdByEmail,
      });
    }

    return {
      status: HttpStatus.OK,
      data: transformedExpenses,
    };
  };
};
