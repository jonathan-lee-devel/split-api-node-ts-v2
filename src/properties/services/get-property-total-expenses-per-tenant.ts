import bunyan from 'bunyan';
import {Model} from 'mongoose';
import Dinero from 'dinero.js';
import {Expense} from '../../expenses/models/Expense';
// eslint-disable-next-line max-len
import {GetPropertyTotalExpensesPerTenantFunction} from '../types/get-property-total-expenses-per-tenant-function';
import {Property} from '../models/Property';
import {User} from '../../users/main/models/User';
// eslint-disable-next-line max-len
import {AmountStringAsNumberFunction} from '../../util/dinero/types/amount-string-as-number';
// eslint-disable-next-line max-len
import {IndividualExpenseBreakdownDto} from '../../expenses/dtos/IndividualExpenseBreakdownDto';

export const makeGetPropertyTotalExpensesPerTenant = (
    logger: bunyan,
    PropertyModel: Model<Property>,
    ExpenseModel: Model<Expense>,
    amountStringAsNumber: AmountStringAsNumberFunction,
): GetPropertyTotalExpensesPerTenantFunction => {
  return async function getPropertyTotalExpensesPerTenant(
      requestingUser: User,
      propertyId: string,
  ) {
    try {
      const propertyModel = await PropertyModel
          .findOne({id: propertyId}, {__v: 0});
      if (!propertyModel) {
        return {
          status: 404,
          data: undefined,
        };
      }
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
          data: {
            total: '€0.00',
            expenses: [],
          },
        };
      }
      let total = 0.0;
      const individualExpenseBreakdownDtos
                : IndividualExpenseBreakdownDto[] = [];
      const numberOfTenants = propertyModel.tenantEmails.length;
      for (const expense of expenses) {
        const amountAsNumber = amountStringAsNumber((await expense).amount);
        individualExpenseBreakdownDtos.push(
            {
              expenseTitle: (await expense).title,
              // eslint-disable-next-line new-cap
              amount: Dinero({
                amount: Math.round((amountAsNumber / numberOfTenants) * 100),
                currency: 'EUR',
                precision: 2,
              }).toFormat(),
            },
        );
        total += amountAsNumber;
      }
      total /= numberOfTenants;
      // eslint-disable-next-line new-cap
      const totalAsCurrency = Dinero({
        amount: Math.round(total * 100),
        currency: 'EUR',
        precision: 2,
      });
      return {
        status: 200,
        data: {
          total: totalAsCurrency.toFormat(),
          expenses: individualExpenseBreakdownDtos,
        },
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
