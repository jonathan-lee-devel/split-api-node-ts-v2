// eslint-disable-next-line max-len
import {makeGetPropertyRequireTenantOrAdmin} from './get-property-require-tenant-or-admin';
import {PropertyModel} from '../../../properties/models/Property';
// eslint-disable-next-line max-len
import {makeGetAggregatedExpensesForMonth} from './get-aggregated-expenses-for-month';
import {ExpenseModel} from '../../../expenses/models/Expense';

export const getPropertyRequireTenantOrAdmin =
    makeGetPropertyRequireTenantOrAdmin(PropertyModel);

export const getAggregatedExpensesForMonth =
    makeGetAggregatedExpensesForMonth(ExpenseModel);
