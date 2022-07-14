import express from 'express';
import {configureGetExpenseRoute} from './get-expense';
import {configureCreateExpenseRoute} from './create-expense';
import {configureDeleteExpenseRoute} from './delete-expense';
// eslint-disable-next-line max-len
import {configureGetExpensesForPropertyRoute} from './get-expenses-for-property';
import {configureUpdateExpenseRoute} from './update-expense';
// eslint-disable-next-line max-len
import {createExpense, deleteExpense, getExpense, getExpensesForProperty, updateExpense} from '../services';

// eslint-disable-next-line new-cap
const router = express.Router();

configureGetExpenseRoute(router, '/:expenseId', getExpense);
configureGetExpensesForPropertyRoute(
    router,
    '/for/property/:propertyId',
    getExpensesForProperty,
);
configureCreateExpenseRoute(router, '/create', createExpense);
configureDeleteExpenseRoute(router, '/delete/:expenseId', deleteExpense);
configureUpdateExpenseRoute(router, '/update/:expenseId', updateExpense);

export {router as ExpensesRouter};
