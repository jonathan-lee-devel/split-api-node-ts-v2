import {makeGetExpense} from './get-expense';
import {ExpenseModel} from '../models/Expense';
import {PropertyModel} from '../../properties/models/Property';
import {makeCreateExpense} from './create-expense';
import {generatedId} from '../../util/id/services';
import {makeDeleteExpense} from './delete-expense';
import {loggerConfig} from '../../main/config/logger/logger-config';
import {makeGetExpensesForProperty} from './get-expenses-for-property';
import {makeUpdateExpense} from './update-expense';
import {ExpenseDistributionAssignmentModel} from '../models/ExpenseDistributionAssignment';
import {makeCreateExpenseDistributionAssignment} from './create-expense-distribution-assignment';
import {makeUpdateExpenseDistributionAssignment} from './update-expense-distribution-assignment';
import {makeDeleteExpenseDistributionAssignment} from './delete-expense-distribution-assignment';
import {makeGetExpenseDistributionAssignmentsForProperty} from './get-expense-distribution-assignments-for-property';
import {makeGetExpenseDistributionAssignment} from './get-expense-distribution-assignment';
import {makeGetExpensesForMonth} from './get-expenses-for-month';
import {getAggregatedExpensesForMonth} from '../../common/use-cases/properties';

const logger = loggerConfig();

export const getExpense = makeGetExpense(
    ExpenseModel,
    PropertyModel,
);

export const createExpense = makeCreateExpense(
    logger,
    generatedId,
    PropertyModel,
    ExpenseModel,
);

export const deleteExpense = makeDeleteExpense(
    logger,
    ExpenseModel,
    ExpenseDistributionAssignmentModel,
    PropertyModel,
);

export const getExpensesForProperty = makeGetExpensesForProperty(
    logger,
    PropertyModel,
    ExpenseModel,
);

export const getExpensesForMonth = makeGetExpensesForMonth(
    logger,
    PropertyModel,
    getAggregatedExpensesForMonth,
);

export const updateExpense = makeUpdateExpense(
    logger,
    ExpenseModel,
    PropertyModel,
);

export const createExpenseDistributionAssignment =
    makeCreateExpenseDistributionAssignment(
        logger,
        generatedId,
        ExpenseModel,
        PropertyModel,
        ExpenseDistributionAssignmentModel,
    );

export const updateExpenseDistributionAssignment =
    makeUpdateExpenseDistributionAssignment(
        logger,
        ExpenseDistributionAssignmentModel,
        ExpenseModel,
        PropertyModel,
    );

export const deleteExpenseDistributionAssignment =
    makeDeleteExpenseDistributionAssignment(
        logger,
        ExpenseDistributionAssignmentModel,
        ExpenseModel,
        PropertyModel,
    );

export const getExpenseDistributionAssignment =
    makeGetExpenseDistributionAssignment(
        logger,
        PropertyModel,
        ExpenseDistributionAssignmentModel,
    );

export const getExpenseDistributionAssignmentsForProperty =
    makeGetExpenseDistributionAssignmentsForProperty(
        logger,
        PropertyModel,
        ExpenseModel,
        ExpenseDistributionAssignmentModel,
    );
