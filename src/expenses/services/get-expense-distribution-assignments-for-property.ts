import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Property} from '../../properties/models/Property';
// eslint-disable-next-line max-len
import {ExpenseDistributionAssignment} from '../models/ExpenseDistributionAssignment';
import {User} from '../../users/main/models/User';
import {
  GetExpenseDistributionAssignmentsForPropertyFunction,
} from '../types/get-expense-distribution-assignments-for-property';
// eslint-disable-next-line max-len
import {returnForbidden, returnInternalServerError, returnNotFound} from '../../common/use-cases/status-data-container';
import {Expense} from '../models/Expense';
// eslint-disable-next-line max-len
import {ExpenseDistributionAssignmentDto} from '../dtos/ExpenseDistributionAssignmentDto';

export const makeGetExpenseDistributionAssignmentsForProperty = (
    logger: bunyan,
    PropertyModel: Model<Property>,
    ExpenseModel: Model<Expense>,
    ExpenseDistributionAssignmentModel:
        Model<ExpenseDistributionAssignment>,
): GetExpenseDistributionAssignmentsForPropertyFunction => {
  return async function getExpenseDistributionAssignmentsForProperty(
      requestingUser: User,
      propertyId: string,
  ) {
    try {
      const propertyModel = await PropertyModel
          .findOne({id: propertyId}, {__v: 0});
      if (!propertyModel) {
        return returnNotFound();
      }
      if (!propertyModel.administratorEmails.includes(requestingUser.email)) {
        return returnForbidden();
      }

      const expenseModels: Expense[] = await ExpenseModel
          .find({propertyId}, {__v: 0});
      const expenseDistributionAssignmentDtos
                : ExpenseDistributionAssignmentDto[] = [];
      for (const expense of expenseModels) {
        const expenseDistributionAssignmentModels:
                    ExpenseDistributionAssignment[] = await
                    ExpenseDistributionAssignmentModel
                        .find({expenseId: expense.id}, {__v: 0});
        for (const expenseDistributionAssignment of
          expenseDistributionAssignmentModels) {
          expenseDistributionAssignmentDtos.push({
            id: expenseDistributionAssignment.id,
            expenseId: expenseDistributionAssignment.expenseId,
            amount: expenseDistributionAssignment.amount,
            tenantEmail: expenseDistributionAssignment.tenantEmail,
          });
        }
      }

      return {
        status: 200,
        data: expenseDistributionAssignmentDtos,
      };
    } catch (err) {
      logger.error(`An error has occurred: ${err}`);
      return returnInternalServerError();
    }
  };
};
