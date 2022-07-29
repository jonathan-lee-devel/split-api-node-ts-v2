import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {GenerateIdFunction} from '../../util/id/types/generate-id';
import {Expense} from '../models/Expense';
// eslint-disable-next-line max-len
import {ExpenseDistributionAssignment} from '../models/ExpenseDistributionAssignment';
// eslint-disable-next-line max-len
import {CreateExpenseDistributionAssignmentFunction} from '../types/create-expense-distribution-assignment';
import {User} from '../../users/main/models/User';
import {Property} from '../../properties/models/Property';
import {DEFAULT_ID_LENGTH} from '../../util/id/constants/default-id-length';
import {amountStringAsNumber} from '../../common/use-cases/dinero';
import {errorMessageToDto} from '../../common/use-cases/errors';

export const makeCreateExpenseDistributionAssignment = (
    logger: bunyan,
    generatedId: GenerateIdFunction,
    ExpenseModel: Model<Expense>,
    PropertyModel: Model<Property>,
    ExpenseDistributionAssignmentModel:
        Model<ExpenseDistributionAssignment>,
): CreateExpenseDistributionAssignmentFunction => {
  return async function createExpenseDistributionAssignment(
      requestingUser: User,
      expenseId: string,
      tenantEmail: string,
      amount: string,
  ) {
    const expenseModel = await ExpenseModel
        .findOne({id: expenseId}, {__v: 0});
    if (!expenseModel) {
      return {
        status: 400,
        data: errorMessageToDto(`Expense with ID ${expenseId} does not exist`),
      };
    }

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
                .find({expenseId}, {__v: 0});
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

    const expenseDistributionAssignmentToSave: ExpenseDistributionAssignment = {
      id: await generatedId(DEFAULT_ID_LENGTH),
      expenseId,
      tenantEmail,
      amount,
    };

    try {
      await new ExpenseDistributionAssignmentModel(
          expenseDistributionAssignmentToSave,
      ).save();
      return {
        status: 201,
        data: {
          ...expenseDistributionAssignmentToSave,
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
