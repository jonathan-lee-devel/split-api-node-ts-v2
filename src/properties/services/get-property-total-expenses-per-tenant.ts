import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {getPropertyRequireTenantOrAdmin} from '../../common/use-cases/properties';
import {ExpenseDistributionAssignment} from '../../expenses/models/ExpenseDistributionAssignment';
import {GetPropertyTotalExpensesPerTenantFunction} from '../types/get-property-total-expenses-per-tenant-function';
import {User} from '../../users/main/models/User';
import {IndividualExpenseBreakdownDto} from '../../expenses/dtos/IndividualExpenseBreakdownDto';
import {amountStringAsNumber, newDineroAmount} from '../../common/use-cases/dinero';
import {returnInternalServerError} from '../../common/use-cases/status-data-container';
import {errorMessageToDto} from '../../common/use-cases/errors';
import {
  GetAggregatedExpensesForMonthFunction,
} from '../../common/use-cases/properties/types/get-aggregated-expenses-for-month';

export const makeGetPropertyTotalExpensesPerTenant = (
    logger: bunyan,
    getAggregatedExpensesForMonth: GetAggregatedExpensesForMonthFunction,
    ExpenseDistributionAssignmentModel:
        Model<ExpenseDistributionAssignment>,
): GetPropertyTotalExpensesPerTenantFunction => {
  return async function getPropertyTotalExpensesPerTenant(
      requestingUser: User,
      propertyId: string,
      month: number,
      year: number,
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

      if (
        propertyModelContainer.data.administratorEmails
            .includes(requestingUser.email) &&
                !propertyModelContainer.data.tenantEmails
                    .includes(requestingUser.email)) {
        return {
          status: 400,
          data: errorMessageToDto('Admin viewing expense report is not a tenant'),
        };
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
      if (expenses.length === 0) {
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
                            0) / 100.00;
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
      return returnInternalServerError();
    }
  };
};
