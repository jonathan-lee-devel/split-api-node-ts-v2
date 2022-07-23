import {createExpense, getExpense, getExpensesForProperty} from '../services';
import {makeGetExpenseController} from './get-expense';
// eslint-disable-next-line max-len
import {makeGetExpensesForPropertyController} from './get-expenses-for-property';
import {makeCreateExpenseController} from './create-expense';

export const getExpenseController = makeGetExpenseController(getExpense);

export const getExpensesForPropertyController =
    makeGetExpensesForPropertyController(getExpensesForProperty);

export const createExpenseController =
    makeCreateExpenseController(createExpense);

