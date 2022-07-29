import bunyan from 'bunyan';
import {Model} from 'mongoose';
// eslint-disable-next-line max-len
import {ExpenseDistributionAssignment} from '../models/ExpenseDistributionAssignment';
import {User} from '../../users/main/models/User';
// eslint-disable-next-line max-len
import {DeleteExpenseDistributionAssignmentFunction} from '../types/delete-expense-distribution-assignment';
import {Expense} from '../models/Expense';
import {Property} from '../../properties/models/Property';
// eslint-disable-next-line max-len
import {returnForbidden, returnInternalServerError, returnNotFound} from '../../common/use-cases/status-data-container';

export const makeDeleteExpenseDistributionAssignment = (
    logger: bunyan,
    ExpenseDistributionAssignmentModel:
        Model<ExpenseDistributionAssignment>,
    ExpenseModel: Model<Expense>,
    PropertyModel: Model<Property>,
): DeleteExpenseDistributionAssignmentFunction => {
  return async function deleteExpenseDistributionAssignment(
      requestingUser: User,
      expenseDistributionAssignmentId: string,
  ) {
    try {
      const expenseDistributionAssignmentModel: ExpenseDistributionAssignment =
                await ExpenseDistributionAssignmentModel
                    .findOne({id: expenseDistributionAssignmentId}, {__v: 0});
      if (!expenseDistributionAssignmentModel) {
        return returnNotFound();
      }

      const expenseModel: Expense = await ExpenseModel
          .findOne({
            id: expenseDistributionAssignmentModel.expenseId,
          }, {__v: 0});
      if (!expenseModel) {
        // eslint-disable-next-line max-len
        logger.error(`Attempting to delete expense distribution assignment ${expenseDistributionAssignmentId} but expense does not exist`);
        return returnInternalServerError();
      }

      const propertyModel = await PropertyModel
          .findOne({id: expenseModel.propertyId}, {__v: 0});
      if (!propertyModel) {
        // eslint-disable-next-line max-len
        logger.error(`No property exists for expense: ${expenseDistributionAssignmentModel.expenseId}`);
        return returnInternalServerError();
      }

      if (!propertyModel.administratorEmails.includes(requestingUser.email)) {
        return returnForbidden();
      }

      await ExpenseDistributionAssignmentModel
          .deleteOne({id: expenseDistributionAssignmentId});
      return {
        status: 204,
        data: undefined,
      };
    } catch (err) {
      logger.error(`An error has occurred: ${err}`);
      return returnInternalServerError();
    }
  };
};
