import express from 'express';
import {loggerConfig} from '../../main/config/logger/logger-config';
import {configureRoute} from '../../main/routes/configure-route';
import {HttpRequestMethod} from '../../main/enums/http-request-method';
import {makeExpressCallback} from '../../main/express-callbacks/express-callback';
import {
  createExpenseController,
  createExpenseDistributionAssignmentController,
  deleteExpenseController,
  deleteExpenseDistributionAssignmentController,
  getExpenseController,
  getExpenseDistributionAssignmentsController,
  getExpenseDistributionAssignmentsForPropertyController,
  getExpensesForMonthController,
  getExpensesForPropertyController,
  updateExpenseController,
  updateExpenseDistributionAssignmentController,
} from '../controllers';
import {createExpenseValidationChain} from '../validation-chains/create-expense';
import {updateExpenseValidationChain} from '../validation-chains/update-expense';
import {
  createExpenseDistributionAssignmentValidationChain,
} from '../validation-chains/create-expense-distribution-assignment';
import {
  updateExpenseDistributionAssignmentValidationChain,
} from '../validation-chains/update-expense-distribution-assignment';

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
    HttpRequestMethod.GET,
    '/for/property/:propertyId/month/:month/year/:year',
    true,
    [],
    makeExpressCallback(logger, getExpensesForMonthController),
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
configureRoute(
    router,
    HttpRequestMethod.DELETE,
    '/distribution-assignments/delete/:expenseDistributionAssignmentId',
    true,
    [],
    makeExpressCallback(logger, deleteExpenseDistributionAssignmentController),
);
configureRoute(
    router,
    HttpRequestMethod.GET,
    '/distribution-assignments/:propertyId/:expenseDistributionAssignmentId',
    true,
    [],
    makeExpressCallback(
        logger,
        getExpenseDistributionAssignmentsController,
    ),
);
configureRoute(
    router,
    HttpRequestMethod.GET,
    '/distribution-assignments/for/property/:propertyId',
    true,
    [],
    makeExpressCallback(
        logger,
        getExpenseDistributionAssignmentsForPropertyController,
    ),
);

export {router as ExpensesRouter};
