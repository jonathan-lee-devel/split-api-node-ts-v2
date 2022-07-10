import {makeGetExpense} from './get-expense';
import {ExpenseModel} from '../models/Expense';
import {PropertyModel} from '../../properties/models/Property';
import {makeCreateExpense} from './create-expense';
import {generatedId} from '../../util/id/exports';

export const getExpense = makeGetExpense(
    ExpenseModel,
    PropertyModel,
);

export const createExpense = makeCreateExpense(
    generatedId,
    ExpenseModel,
);
