import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {ExpenseDistributionAssignment} from '../models/ExpenseDistributionAssignment';
import {User} from '../../users/main/models/User';
import {DeleteExpenseDistributionAssignmentFunction} from '../types/delete-expense-distribution-assignment';
import {Expense} from '../models/Expense';
import {Property} from '../../properties/models/Property';
import {returnForbidden, returnInternalServerError, returnNotFound} from '../../common/use-cases/status-data-container';
import {HttpStatus} from '../../common/enums/HttpStatus';

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
      logger.error(`Attempting to delete expense distribution assignment ${expenseDistributionAssignmentId} but expense does not exist`);
      return returnInternalServerError();
    }

    const propertyModel = await PropertyModel
        .findOne({id: expenseModel.propertyId}, {__v: 0});
    if (!propertyModel) {
      logger.error(`No property exists for expense: ${expenseDistributionAssignmentModel.expenseId}`);
      return returnInternalServerError();
    }

    if (!propertyModel.administratorEmails.includes(requestingUser.email)) {
      return returnForbidden();
    }

    await ExpenseDistributionAssignmentModel
        .deleteOne({id: expenseDistributionAssignmentId});
    return {
      status: HttpStatus.NO_CONTENT,
      data: undefined,
    };
  };
};
