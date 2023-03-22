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
import {makeGetExpensesForPropertyController} from './get-expenses-for-property';
import {makeCreateExpenseController} from './create-expense';
import {makeDeleteExpenseController} from './delete-expense';
import {makeUpdateExpenseController} from './update-expense';
import {makeCreateExpenseDistributionAssignmentController} from './create-expense-distribution-assignment';
import {makeUpdateExpenseDistributionAssignmentController} from './update-expense-distribution-assignment';
import {makeDeleteExpenseDistributionAssignmentController} from './delete-expense-distribution-assignment';
import {
  makeGetExpenseDistributionAssignmentsForPropertyController,
} from './get-expense-distribution-assignments-for-property';
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
