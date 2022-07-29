import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Property} from '../../properties/models/Property';
import {Expense} from '../models/Expense';
// eslint-disable-next-line max-len
import {ExpenseDistributionAssignment} from '../models/ExpenseDistributionAssignment';
// eslint-disable-next-line max-len
import {UpdateExpenseDistributionAssignmentFunction} from '../types/update-expense-distribution-assignment';
import {User} from '../../users/main/models/User';
import {amountStringAsNumber} from '../../common/use-cases/dinero';
import {errorMessageToDto} from '../../common/use-cases/errors';

export const makeUpdateExpenseDistributionAssignment = (
    logger: bunyan,
    ExpenseDistributionAssignmentModel:
        Model<ExpenseDistributionAssignment>,
    ExpenseModel: Model<Expense>,
    PropertyModel: Model<Property>,
): UpdateExpenseDistributionAssignmentFunction => {
  return async function updateExpenseDistributionAssignment(
      requestingUser: User,
      expenseDistributionAssignmentId: string,
      tenantEmail: string,
      amount: string,
  ) {
    const expenseDistributionAssignmentModel = await
    ExpenseDistributionAssignmentModel
        .findOne({id: expenseDistributionAssignmentId}, {__v: 0});
    if (!expenseDistributionAssignmentModel) {
      return {
        status: 404,
        data: undefined,
      };
    }

    const expenseModel = await ExpenseModel
        .findOne({id: expenseDistributionAssignmentModel.expenseId});

    const propertyModel = await PropertyModel
        .findOne({id: expenseModel.propertyId}, {__v: 0});
    if (!propertyModel.administratorEmails.includes(requestingUser.email)) {
      return {
        status: 403,
        data: undefined,
      };
    }

    const expenseDistributionAssignments =
            await ExpenseDistributionAssignmentModel
                .find({id: expenseModel.id}, {__v: 0});
    let total = 0.0;
    for (
      const expenseDistributionAssignment of expenseDistributionAssignments
    ) {
      const amountAsNumber =
                amountStringAsNumber(
                    (await expenseDistributionAssignment).amount,
                );
      total += amountAsNumber;
    }
    const expenseAmountAsNumber = amountStringAsNumber(expenseModel.amount);
    if (total > expenseAmountAsNumber) {
      return {
        status: 400,
        data: errorMessageToDto('Amount exceeds total amount for expense'),
      };
    }

    expenseDistributionAssignmentModel.tenantEmail = tenantEmail;
    expenseDistributionAssignmentModel.amount = amount;

    try {
      await new ExpenseDistributionAssignmentModel(
          expenseDistributionAssignmentModel,
      ).save();
      return {
        status: 200,
        data: {
          id: expenseDistributionAssignmentModel.id,
          expenseId: expenseDistributionAssignmentModel.expenseId,
          tenantEmail: expenseDistributionAssignmentModel.tenantEmail,
          amount: expenseDistributionAssignmentModel.amount,
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
