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
    const expenses = await ExpenseModel.aggregate([
      {'$match': {propertyId: {$eq: propertyId}}},
      {
        '$addFields': {
          month: {$month: '$date'},
          year: {$year: '$date'},
        },
      },
      {'$match': {month: {$eq: month}}},
      {'$match': {year: {$eq: year}}},
      {'$project': {_id: 0, __v: 0, month: 0, year: 0}},
    ]);
    if (!expenses) {
      return returnInternalServerError();
    }

    return {
      status: 200,
      data: expenses,
    };
  };
};
