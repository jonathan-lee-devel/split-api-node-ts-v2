import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {GetPropertyTotalExpensesFunction} from '../types/get-property-total-expenses';
import {Property} from '../models/Property';
import {User} from '../../users/main/models/User';
import {newDineroAmount} from '../../common/use-cases/dinero';
import {returnForbidden, returnInternalServerError, returnNotFound} from '../../common/use-cases/status-data-container';
import {
  GetAggregatedExpensesForMonthFunction,
} from '../../common/use-cases/properties/types/get-aggregated-expenses-for-month';

export const makeGetPropertyTotalExpenses = (
    logger: bunyan,
    PropertyModel: Model<Property>,
    getAggregatedExpensesForMonth: GetAggregatedExpensesForMonthFunction,
): GetPropertyTotalExpensesFunction => {
  return async function getPropertyTotalExpenses(
      requestingUser: User,
      propertyId: string,
      month: number,
      year: number,
  ) {
    const propertyModel = await PropertyModel
        .findOne({id: propertyId}, {__v: 0});
    if (!propertyModel) {
      return returnNotFound();
    }
    if (!propertyModel.tenantEmails
        .includes(requestingUser.email) &&
            !propertyModel.administratorEmails
                .includes(requestingUser.email)) {
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
    let total = 0.0;
    for (const expense of expenses) {
      const amountAsNumber = Number((await expense)
          .amount.replace('€', '')
          .replace(',', ''),
      );
      total += amountAsNumber;
    }
    return {
      status: 200,
      data: newDineroAmount(total).toFormat(),
    };
  };
};
