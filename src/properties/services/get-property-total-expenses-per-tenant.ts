import bunyan from 'bunyan';
import {Model} from 'mongoose';
import Dinero from 'dinero.js';
import {Expense} from '../../expenses/models/Expense';
// eslint-disable-next-line max-len
import {GetPropertyTotalExpensesPerTenantFunction} from '../types/get-property-total-expenses-per-tenant-function';
import {Property} from '../models/Property';
import {User} from '../../users/main/models/User';

export const makeGetPropertyTotalExpensesPerTenant = (
    logger: bunyan,
    PropertyModel: Model<Property>,
    ExpenseModel: Model<Expense>,
): GetPropertyTotalExpensesPerTenantFunction => {
  return async function getPropertyTotalExpensesPerTenant(
      requestingUser: User,
      propertyId: string,
  ) {
    try {
      const propertyModel = await PropertyModel
          .findOne({id: propertyId}, {__v: 0});
      if (!propertyModel.tenantEmails
          .includes(requestingUser.email) &&
                !propertyModel.administratorEmails
                    .includes(requestingUser.email)) {
        return {
          status: 403,
          data: undefined,
        };
      }
      const expenses = await ExpenseModel.find({propertyId}, {__v: 0});
      if (!expenses) {
        return {
          status: 200,
          data: '€0.00',
        };
      }
      let total = 0.0;
      for (const expense of expenses) {
        const amountAsNumber = Number((await expense)
            .amount.replace('€', '')
            .replace(',', ''),
        );
        total += amountAsNumber;
      }
      const numberOfTenants = propertyModel.tenantEmails.length;
      total /= numberOfTenants;
      const totalAsCurrency =
                // eslint-disable-next-line new-cap,max-len
                Dinero({amount: Math.round(total * 100), currency: 'EUR', precision: 2});
      return {
        status: 200,
        data: totalAsCurrency.toFormat(),
      };
    } catch (err) {
      logger.error(`An error has occurred: ${err}`);
      return {
        status: 500,
        data: undefined,
      };
    }
  };
};
