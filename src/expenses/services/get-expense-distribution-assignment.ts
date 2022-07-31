import bunyan from 'bunyan';
// eslint-disable-next-line max-len
import {GetExpenseDistributionAssignmentFunction} from '../types/get-expense-distribution-assignment';
import {User} from '../../users/main/models/User';
// eslint-disable-next-line max-len
import {returnForbidden, returnInternalServerError, returnNotFound} from '../../common/use-cases/status-data-container';
import {Model} from 'mongoose';
// eslint-disable-next-line max-len
import {ExpenseDistributionAssignment} from '../models/ExpenseDistributionAssignment';
import {Property} from '../../properties/models/Property';
import {ExpenseDistributionAssignmentDto} from '../dtos/ExpenseDistributionAssignmentDto';

export const makeGetExpenseDistributionAssignment = (
    logger: bunyan,
    PropertyModel: Model<Property>,
    ExpenseDistributionAssignmentModel:
        Model<ExpenseDistributionAssignment>,
): GetExpenseDistributionAssignmentFunction => {
  return async function getExpenseDistributionAssignment(
      requestingUser: User,
      propertyId: string,
      expenseDistributionAssignmentId: string) {
    try {
      const propertyModel: Property = await PropertyModel
          .findOne({id: propertyId}, {__v: 0});
      if (!propertyModel) {
        return returnNotFound();
      }

      if (!propertyModel.tenantEmails.includes(requestingUser.email)) {
        return returnForbidden();
      }

      const expenseDistributionAssignmentModel:
                ExpenseDistributionAssignment = await
                ExpenseDistributionAssignmentModel
                    .findOne({id: expenseDistributionAssignmentId}, {__v: 0});
      if (!expenseDistributionAssignmentModel) {
        return returnNotFound();
      }

      const expenseDistributionAssignmentDto
                : ExpenseDistributionAssignmentDto = {
                  id: expenseDistributionAssignmentModel.id,
                  expenseId: expenseDistributionAssignmentModel.expenseId,
                  amount: expenseDistributionAssignmentModel.amount,
                  tenantEmail: expenseDistributionAssignmentModel.tenantEmail,
                };

      return {
        status: 200,
        data: expenseDistributionAssignmentDto,
      };
    } catch (err) {
      return returnInternalServerError();
    }
  };
};
