import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Expense} from '../../expenses/models/Expense';
// eslint-disable-next-line max-len
import {GetPropertyTotalExpensesFunction} from '../types/get-property-total-expenses';
import {Property} from '../models/Property';
import {User} from '../../users/main/models/User';
import {newDineroAmount} from '../../common/use-cases/dinero';
// eslint-disable-next-line max-len
import {returnForbidden, returnInternalServerError} from '../../common/use-cases/status-data-container';

export const makeGetPropertyTotalExpenses = (
    logger: bunyan,
    PropertyModel: Model<Property>,
    ExpenseModel: Model<Expense>,
): GetPropertyTotalExpensesFunction => {
  return async function getPropertyTotalExpenses(
      requestingUser: User,
      propertyId: string,
      month: number,
      year: number,
  ) {
    try {
      const propertyModel = await PropertyModel
          .findOne({id: propertyId}, {__v: 0});
      if (!propertyModel.tenantEmails
          .includes(requestingUser.email) &&
                !propertyModel.administratorEmails
                    .includes(requestingUser.email)) {
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
    } catch (err) {
      logger.error(`An error has occurred: ${err}`);
      return returnInternalServerError();
    }
  };
};
