import express from 'express';
import {configureCreateExpenseRoute} from './create-expense';
import {configureDeleteExpenseRoute} from './delete-expense';
// eslint-disable-next-line max-len
import {configureUpdateExpenseRoute} from './update-expense';
// eslint-disable-next-line max-len
import {createExpense, deleteExpense, updateExpense} from '../services';
import {loggerConfig} from '../../main/config/logger/logger-config';
import {configureRoute} from '../../main/routes/configure-route';
import {HttpRequestMethod} from '../../main/enums/http-request-method';
// eslint-disable-next-line max-len
import {makeExpressCallback} from '../../main/express-callbacks/express-callback';
// eslint-disable-next-line max-len
import {getExpenseController, getExpensesForPropertyController} from '../controllers';

// eslint-disable-next-line new-cap
const router = express.Router();

const logger = loggerConfig();

configureRoute(
    router,
    HttpRequestMethod.GET,
    '/:expenseId',
    true,
    [],
    makeExpressCallback(logger, getExpenseController),
);
configureRoute(
    router,
    HttpRequestMethod.GET,
    '/for/property/:propertyId',
    true,
    [],
    makeExpressCallback(logger, getExpensesForPropertyController),
);
configureCreateExpenseRoute(router, '/create', createExpense);
configureDeleteExpenseRoute(router, '/delete/:expenseId', deleteExpense);
configureUpdateExpenseRoute(router, '/update/:expenseId', updateExpense);

export {router as ExpensesRouter};
