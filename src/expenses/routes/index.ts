import express from 'express';
import {configureGetExpenseRoute} from './get-expense';
import {configureCreateExpenseRoute} from './create-expense';
import {createExpense, getExpense} from '../services';

// eslint-disable-next-line new-cap
const router = express.Router();

configureGetExpenseRoute(router, '/:expenseId', getExpense);
configureCreateExpenseRoute(router, '/', createExpense);

export {router as ExpensesRouter};
