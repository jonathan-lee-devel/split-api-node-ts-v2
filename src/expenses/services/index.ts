import {makeGetExpense} from './get-expense';
import {ExpenseModel} from '../models/Expense';
import {PropertyModel} from '../../properties/models/Property';
import {makeCreateExpense} from './create-expense';
import {generatedId} from '../../util/id/services';
import {makeDeleteExpense} from './delete-expense';
import {loggerConfig} from '../../main/config/logger/logger-config';
import {makeGetExpensesForProperty} from './get-expenses-for-property';
import {makeUpdateExpense} from './update-expense';

const logger = loggerConfig();

export const getExpense = makeGetExpense(
    ExpenseModel,
    PropertyModel,
);

export const createExpense = makeCreateExpense(
    generatedId,
    ExpenseModel,
);

export const deleteExpense = makeDeleteExpense(
    logger,
    ExpenseModel,
    PropertyModel,
);

export const getExpensesForProperty = makeGetExpensesForProperty(
    logger,
    PropertyModel,
    ExpenseModel,
);

export const updateExpense = makeUpdateExpense(
    logger,
    ExpenseModel,
    PropertyModel,
);
