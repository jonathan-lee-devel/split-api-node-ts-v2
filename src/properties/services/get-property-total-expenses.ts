import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {GetPropertyTotalExpensesFunction} from '../types/get-property-total-expenses';
import {Property} from '../models/Property';
import {User} from '../../users/main/models/User';
import {amountStringAsNumber, newDineroAmount} from '../../common/use-cases/dinero';
import {returnForbidden, returnInternalServerError, returnNotFound} from '../../common/use-cases/status-data-container';
import {
  GetAggregatedExpensesForMonthFunction,
} from '../../common/use-cases/properties/types/get-aggregated-expenses-for-month';
import {HttpStatus} from '../../common/enums/HttpStatus';

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
    logger.info(`<${requestingUser.email}> get property with ID: ${propertyId} total expenses`);
    const propertyModel = await PropertyModel
        .findOne({id: propertyId}, {__v: 0});
    if (!propertyModel) {
      return returnNotFound();
    }
    if (!propertyModel.tenantEmails.includes(requestingUser.email) &&
            !propertyModel.administratorEmails.includes(requestingUser.email)) {
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
      const amountAsNumber = amountStringAsNumber(String(Number(await expense)));
      total += amountAsNumber;
    }
    return {
      status: HttpStatus.OK,
      data: newDineroAmount(total).toFormat(),
    };
  };
};
