import {makeCreatePropertyController} from './create-property';
import {
  createProperty,
  deleteProperty,
  getPropertiesForUserAsAdmin,
  getPropertiesForUserAsTenant,
  getProperty,
  getPropertyIsAdmin,
  getPropertyTotalExpenses,
  getPropertyTotalExpensesPerTenant,
  inviteTenantsToProperty,
  removeTenantFromProperty,
} from '../services';
import {makeDeletePropertyController} from './delete-property';
import {makeGetPropertyController} from './get-property';
// eslint-disable-next-line max-len
import {makeGetPropertiesForUserAsAdminController} from './get-properties-for-user-as-admin';
// eslint-disable-next-line max-len
import {makeGetPropertiesForUserAsTenantController} from './get-properties-for-user-as-tenant';
// eslint-disable-next-line max-len
import {makeRemoveTenantFromPropertyController} from './remove-tenant-from-property';
import {makeTenantLeavePropertyController} from './tenant-leave-property';
// eslint-disable-next-line max-len
import {makeInviteTenantsToPropertyController} from './invite-tenants-to-property';
import {makeGetPropertyIsAdminController} from './get-property-is-admin';
// eslint-disable-next-line max-len
import {makeGetPropertyTotalExpensesController} from './get-property-total-expenses';
// eslint-disable-next-line max-len
import {makeGetPropertyTotalExpensesPerTenantController} from './get-property-total-expenses-per-tenant';

export const getPropertyController =
    makeGetPropertyController(getProperty);

export const getPropertiesForUserAsAdminController =
    makeGetPropertiesForUserAsAdminController(getPropertiesForUserAsAdmin);

export const getPropertiesForUserAsTenantController =
    makeGetPropertiesForUserAsTenantController(getPropertiesForUserAsTenant);

export const createPropertyController =
    makeCreatePropertyController(createProperty);

export const deletePropertyController =
    makeDeletePropertyController(deleteProperty);

export const removeTenantFromPropertyController =
    makeRemoveTenantFromPropertyController(removeTenantFromProperty);

export const tenantLeavePropertyController =
    makeTenantLeavePropertyController(removeTenantFromProperty);

export const inviteTenantsToPropertyController =
    makeInviteTenantsToPropertyController(inviteTenantsToProperty);

export const getPropertyIsAdminController =
    makeGetPropertyIsAdminController(getPropertyIsAdmin);

export const getPropertyTotalExpensesController =
    makeGetPropertyTotalExpensesController(getPropertyTotalExpenses);

export const getPropertyTotalExpensesPerTenantController =
    makeGetPropertyTotalExpensesPerTenantController(
        getPropertyTotalExpensesPerTenant);
