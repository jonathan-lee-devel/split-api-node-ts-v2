import {Model} from 'mongoose';
import bunyan from 'bunyan';
import {Property} from '../../properties/models/Property';
import {GetExpensesForMonthFunction} from '../types/get-expenses-for-month';
import {User} from '../../users/main/models/User';
import {returnForbidden, returnInternalServerError, returnNotFound} from '../../common/use-cases/status-data-container';
import {
  GetAggregatedExpensesForMonthFunction,
} from '../../common/use-cases/properties/types/get-aggregated-expenses-for-month';

export const makeGetExpensesForMonth = (
    _logger: bunyan,
    PropertyModel: Model<Property>,
    getAggregatedExpensesForMonth: GetAggregatedExpensesForMonthFunction,
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
    const expenses = await getAggregatedExpensesForMonth(
        requestingUser,
        propertyId,
        month,
        year,
    );
    if (!expenses) {
      return returnInternalServerError();
    }

    return {
      status: 200,
      data: expenses,
    };
  };
};
