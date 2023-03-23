import {DeleteExpenseFunction} from '../types/delete-expense';
import {User} from '../../users/main/models/User';
import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Expense} from '../models/Expense';
import {Property} from '../../properties/models/Property';
import {ExpenseDistributionAssignment} from '../models/ExpenseDistributionAssignment';
import {returnForbidden, returnInternalServerError, returnNotFound} from '../../common/use-cases/status-data-container';

export const makeDeleteExpense = (
    logger: bunyan,
    ExpenseModel: Model<Expense>,
    ExpenseDistributionAssignmentModel: Model<ExpenseDistributionAssignment>,
    PropertyModel: Model<Property>,
): DeleteExpenseFunction => {
  return async function deleteExpense(
      requestingUser: User,
      expenseId: string,
  ) {
    const expenseModel = await ExpenseModel
        .findOne({id: expenseId}, {__v: 0});
    if (!expenseModel) {
      return returnNotFound();
    }

    const propertyModel = await PropertyModel
        .findOne({id: expenseModel.propertyId}, {__v: 0});
    if (!propertyModel) {
      logger.error(`Attempting to delete expense: ${expenseId} for which property does not exist`);
      return returnInternalServerError();
    }

    if (!propertyModel.administratorEmails.includes(requestingUser.email)) {
      return returnForbidden();
    }

    await ExpenseModel.deleteOne({id: expenseId});
    await ExpenseDistributionAssignmentModel.deleteMany({expenseId});
    return {
      status: 204,
      data: undefined,
    };
  };
};
