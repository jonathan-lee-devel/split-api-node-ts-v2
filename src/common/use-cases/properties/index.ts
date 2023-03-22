import {makeGetPropertyRequireTenantOrAdmin} from './get-property-require-tenant-or-admin';
import {PropertyModel} from '../../../properties/models/Property';
import {makeGetAggregatedExpensesForMonth} from './get-aggregated-expenses-for-month';
import {ExpenseModel} from '../../../expenses/models/Expense';

export const getPropertyRequireTenantOrAdmin =
    makeGetPropertyRequireTenantOrAdmin(PropertyModel);

export const getAggregatedExpensesForMonth =
    makeGetAggregatedExpensesForMonth(ExpenseModel);
