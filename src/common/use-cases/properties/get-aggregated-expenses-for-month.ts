import {User} from '../../../users/main/models/User';
import {Expense} from '../../../expenses/models/Expense';
import {Model} from 'mongoose';
// eslint-disable-next-line max-len
import {GetAggregatedExpensesForMonthFunction} from './types/get-aggregated-expenses-for-month';

export const makeGetAggregatedExpensesForMonth = (
    ExpenseModel: Model<Expense>,
): GetAggregatedExpensesForMonthFunction => {
  return async function getAggregatedExpensesForMonth(
      requestingUser: User,
      propertyId: string,
      month: number,
      year: number,
  ) {
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

    return expenses;
  };
};
