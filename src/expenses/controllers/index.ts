import {
  createExpense,
  createExpenseDistributionAssignment,
  deleteExpense,
  deleteExpenseDistributionAssignment,
  getExpense,
  getExpenseDistributionAssignment,
  getExpenseDistributionAssignmentsForProperty,
  getExpensesForMonth,
  getExpensesForProperty,
  updateExpense,
  updateExpenseDistributionAssignment,
} from '../services';
import {makeGetExpenseController} from './get-expense';
// eslint-disable-next-line max-len
import {makeGetExpensesForPropertyController} from './get-expenses-for-property';
import {makeCreateExpenseController} from './create-expense';
import {makeDeleteExpenseController} from './delete-expense';
import {makeUpdateExpenseController} from './update-expense';
// eslint-disable-next-line max-len
import {makeCreateExpenseDistributionAssignmentController} from './create-expense-distribution-assignment';
// eslint-disable-next-line max-len
import {makeUpdateExpenseDistributionAssignmentController} from './update-expense-distribution-assignment';
// eslint-disable-next-line max-len
import {makeDeleteExpenseDistributionAssignmentController} from './delete-expense-distribution-assignment';
import {
  makeGetExpenseDistributionAssignmentsForPropertyController,
} from './get-expense-distribution-assignments-for-property';
// eslint-disable-next-line max-len
import {makeGetExpenseDistributionAssignmentsController} from './get-expense-distribution-assignment';
import {makeGetExpensesForMonthController} from './get-expenses-for-month';

export const getExpenseController = makeGetExpenseController(getExpense);

export const getExpensesForPropertyController =
    makeGetExpensesForPropertyController(getExpensesForProperty);

export const getExpensesForMonthController =
    makeGetExpensesForMonthController(getExpensesForMonth);

export const createExpenseController =
    makeCreateExpenseController(createExpense);

export const deleteExpenseController =
    makeDeleteExpenseController(deleteExpense);

export const updateExpenseController =
    makeUpdateExpenseController(updateExpense);

export const createExpenseDistributionAssignmentController =
    makeCreateExpenseDistributionAssignmentController(
        createExpenseDistributionAssignment,
    );

export const updateExpenseDistributionAssignmentController =
    makeUpdateExpenseDistributionAssignmentController(
        updateExpenseDistributionAssignment,
    );

export const deleteExpenseDistributionAssignmentController =
    makeDeleteExpenseDistributionAssignmentController(
        deleteExpenseDistributionAssignment,
    );

export const getExpenseDistributionAssignmentsController =
    makeGetExpenseDistributionAssignmentsController(
        getExpenseDistributionAssignment,
    );

export const getExpenseDistributionAssignmentsForPropertyController =
    makeGetExpenseDistributionAssignmentsForPropertyController(
        getExpenseDistributionAssignmentsForProperty,
    );
