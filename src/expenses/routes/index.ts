import express from 'express';
// eslint-disable-next-line max-len
import {configureUpdateExpenseRoute} from './update-expense';
// eslint-disable-next-line max-len
import {updateExpense} from '../services';
import {loggerConfig} from '../../main/config/logger/logger-config';
import {configureRoute} from '../../main/routes/configure-route';
import {HttpRequestMethod} from '../../main/enums/http-request-method';
// eslint-disable-next-line max-len
import {makeExpressCallback} from '../../main/express-callbacks/express-callback';
// eslint-disable-next-line max-len
import {
  createExpenseController,
  deleteExpenseController,
  getExpenseController,
  getExpensesForPropertyController,
} from '../controllers';
// eslint-disable-next-line max-len
import {createExpenseValidationChain} from '../validation-chains/create-expense';

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
configureRoute(
    router,
    HttpRequestMethod.POST,
    '/create',
    true,
    createExpenseValidationChain,
    makeExpressCallback(logger, createExpenseController),
);
configureRoute(
    router,
    HttpRequestMethod.DELETE,
    '/delete/:expenseId',
    true,
    [],
    makeExpressCallback(logger, deleteExpenseController),
);
configureUpdateExpenseRoute(router, '/update/:expenseId', updateExpense);

export {router as ExpensesRouter};
