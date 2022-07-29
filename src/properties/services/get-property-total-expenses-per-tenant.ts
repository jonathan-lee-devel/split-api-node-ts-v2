import bunyan from 'bunyan';
import {Model} from 'mongoose';
// eslint-disable-next-line max-len
import {getPropertyRequireTenantOrAdmin} from '../../common/use-cases/properties';
import {Expense} from '../../expenses/models/Expense';
// eslint-disable-next-line max-len
import {ExpenseDistributionAssignment} from '../../expenses/models/ExpenseDistributionAssignment';
// eslint-disable-next-line max-len
import {GetPropertyTotalExpensesPerTenantFunction} from '../types/get-property-total-expenses-per-tenant-function';
import {User} from '../../users/main/models/User';
// eslint-disable-next-line max-len
import {IndividualExpenseBreakdownDto} from '../../expenses/dtos/IndividualExpenseBreakdownDto';
// eslint-disable-next-line max-len
import {amountStringAsNumber, newDineroAmount} from '../../common/use-cases/dinero';

export const makeGetPropertyTotalExpensesPerTenant = (
    logger: bunyan,
    ExpenseModel: Model<Expense>,
    ExpenseDistributionAssignmentModel:
        Model<ExpenseDistributionAssignment>,
): GetPropertyTotalExpensesPerTenantFunction => {
  return async function getPropertyTotalExpensesPerTenant(
      requestingUser: User,
      propertyId: string,
  ) {
    try {
      const propertyModelContainer =
                await getPropertyRequireTenantOrAdmin(
                    requestingUser, propertyId,
                );
      if (propertyModelContainer.status !== 200) {
        return {
          status: propertyModelContainer.status,
          data: undefined,
        };
      }

      const expenses = await ExpenseModel.find({propertyId}, {__v: 0});
      if (!expenses) {
        return {
          status: 200, data: {total: '€0.00', expenses: []},
        };
      }

      let total = 0.0;
      const individualExpenseBreakdownDtos
                : IndividualExpenseBreakdownDto[] = [];
      const numberOfTenants = propertyModelContainer.data.tenantEmails.length;
      for (const expense of expenses) {
        const expenseDistributionAssignments: ExpenseDistributionAssignment[] =
                    await ExpenseDistributionAssignmentModel
                        .find({expenseId: (await expense).id},
                            {__v: 0});
        const expenseDistributionAssignmentsForUser =
                    expenseDistributionAssignments
                        .filter((expenseDistributionAssignment) => {
                          return (
                            expenseDistributionAssignment.tenantEmail ===
                                requestingUser.email);
                        }).pop();
        if (expenseDistributionAssignmentsForUser) {
          const amountString = newDineroAmount(parseInt(
              expenseDistributionAssignmentsForUser.amount) / 100).toFormat();
          individualExpenseBreakdownDtos.push({
            expenseTitle: (await expense).title, amount: amountString,
          });
          total += amountStringAsNumber(amountString);
        } else {
          const remainingNumberOfTenants = numberOfTenants -
                        expenseDistributionAssignments.length;
          const sumOfDistributionAmounts =
                        expenseDistributionAssignments
                            .reduce((sum, currentValue) =>
                              sum + amountStringAsNumber(currentValue.amount),
                            0);
          const amountAsNumber = amountStringAsNumber((await expense).amount);
          const amountToPay =
                        (amountAsNumber - sumOfDistributionAmounts) /
                        remainingNumberOfTenants;
          individualExpenseBreakdownDtos.push(
              {
                expenseTitle: (await expense).title,
                amount: newDineroAmount(amountToPay).toFormat(),
              },
          );
          total += amountToPay;
        }
      }
      return {
        status: 200,
        data: {
          total: newDineroAmount(total).toFormat(),
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
