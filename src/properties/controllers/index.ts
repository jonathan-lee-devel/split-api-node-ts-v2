import {makeCreatePropertyController} from './create-property';
import {
  createProperty,
  deescalateTenantPrivileges,
  deleteProperty,
  escalateTenantPrivileges,
  getPropertiesForUserAsAdmin,
  getPropertiesForUserAsTenant,
  getProperty,
  getPropertyTotalExpenses,
  getPropertyTotalExpensesPerTenant,
  inviteTenantsToProperty,
  removeTenantFromProperty,
} from '../services';
import {makeDeletePropertyController} from './delete-property';
import {makeGetPropertyController} from './get-property';
import {makeGetPropertiesForUserAsAdminController} from './get-properties-for-user-as-admin';
import {makeGetPropertiesForUserAsTenantController} from './get-properties-for-user-as-tenant';
import {makeRemoveTenantFromPropertyController} from './remove-tenant-from-property';
import {makeTenantLeavePropertyController} from './tenant-leave-property';
import {makeInviteTenantsToPropertyController} from './invite-tenants-to-property';
import {makeGetPropertyTotalExpensesController} from './get-property-total-expenses';
import {makeGetPropertyTotalExpensesPerTenantController} from './get-property-total-expenses-per-tenant';
import {makeEscalateTenantPrivilegesController} from './escalate-tenant-privileges';
import {makeDeescalateTenantPrivilegesController} from './deescalate-tenant-privileges';

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

export const getPropertyTotalExpensesController =
    makeGetPropertyTotalExpensesController(getPropertyTotalExpenses);

export const getPropertyTotalExpensesPerTenantController =
    makeGetPropertyTotalExpensesPerTenantController(
        getPropertyTotalExpensesPerTenant);

export const escalateTenantPrivilegesController =
    makeEscalateTenantPrivilegesController(escalateTenantPrivileges);

export const deescalateTenantPrivilegesController =
    makeDeescalateTenantPrivilegesController(deescalateTenantPrivileges);
