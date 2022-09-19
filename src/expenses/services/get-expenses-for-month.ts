import {Model} from 'mongoose';
import bunyan from 'bunyan';
import {Expense} from '../models/Expense';
import {Property} from '../../properties/models/Property';
import {GetExpensesForMonthFunction} from '../types/get-expenses-for-month';
import {User} from '../../users/main/models/User';
// eslint-disable-next-line max-len
import {returnForbidden, returnInternalServerError, returnNotFound} from '../../common/use-cases/status-data-container';

export const makeGetExpensesForMonth = (
    _logger: bunyan,
    PropertyModel: Model<Property>,
    ExpenseModel: Model<Expense>,
): GetExpensesForMonthFunction => {
  return async function getExpensesForMonth(
      requestingUser: User,
      propertyId: string,
      month: number,
      year: number,
  ) {
    const property = await PropertyModel
        .findOne({id: propertyId}, {__v: 0});
    if (!property) {
      return returnNotFound();
    }
    if (!property.tenantEmails.includes(requestingUser.email) &&
            !property.administratorEmails.includes(requestingUser.email)) {
      return returnForbidden();
    }
    const rawExpenses = await ExpenseModel.aggregate([
      {'$match': {propertyId: {$eq: `${propertyId}`}}},
      {
        '$addFields': {
          month: {$month: '$date'},
          year: {$year: '$date'},
        },
      },
    ]);
    // This is a workaround, MongoDB aggregation doesn't seem to work here
    const expenses = rawExpenses.filter((expense) =>
      Number(expense.month) === Number(month) &&
            Number(expense.year) === Number(year));
    expenses.forEach((expense) => {
      delete expense.month;
      delete expense.year;
      delete expense._id;
      delete expense.__v;
    });
    if (!expenses) {
      return returnInternalServerError();
    }

    return {
      status: 200,
      data: expenses,
    };
  };
};
