import express from 'express';
// eslint-disable-next-line max-len
import {loggerConfig} from '../../main/config/logger/logger-config';
import {configureRoute} from '../../main/routes/configure-route';
import {HttpRequestMethod} from '../../main/enums/http-request-method';
// eslint-disable-next-line max-len
import {makeExpressCallback} from '../../main/express-callbacks/express-callback';
import {
  createExpenseController,
  createExpenseDistributionAssignmentController,
  deleteExpenseController,
  getExpenseController,
  getExpensesForPropertyController,
  updateExpenseController,
  updateExpenseDistributionAssignmentController,
} from '../controllers';
// eslint-disable-next-line max-len
import {createExpenseValidationChain} from '../validation-chains/create-expense';
// eslint-disable-next-line max-len
import {updateExpenseValidationChain} from '../validation-chains/update-expense';
import {
  createExpenseDistributionAssignmentValidationChain,
} from '../validation-chains/create-expense-distribution-assignment';
import {
  updateExpenseDistributionAssignmentValidationChain,
} from '../validation-chains/update-expense-distribution-assignment';

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
configureRoute(
    router,
    HttpRequestMethod.PATCH,
    '/update/:expenseId',
    true,
    updateExpenseValidationChain,
    makeExpressCallback(logger, updateExpenseController),
);
configureRoute(
    router,
    HttpRequestMethod.POST,
    '/distribution-assignments/create',
    true,
    createExpenseDistributionAssignmentValidationChain,
    makeExpressCallback(logger, createExpenseDistributionAssignmentController),
);
configureRoute(
    router,
    HttpRequestMethod.PATCH,
    '/distribution-assignments/update/:expenseDistributionAssignmentId',
    true,
    updateExpenseDistributionAssignmentValidationChain,
    makeExpressCallback(logger, updateExpenseDistributionAssignmentController),
);

export {router as ExpensesRouter};
