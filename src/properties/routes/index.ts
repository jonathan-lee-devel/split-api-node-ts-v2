import express from 'express';
import {makeExpressCallback} from '../../main/express-callbacks/express-callback';
import {
  createPropertyController,
  deescalateTenantPrivilegesController,
  deletePropertyController,
  escalateTenantPrivilegesController,
  getPropertiesForUserAsAdminController,
  getPropertiesForUserAsTenantController,
  getPropertyController,
  getPropertyTotalExpensesController,
  getPropertyTotalExpensesPerTenantController,
  inviteTenantsToPropertyController,
  removeTenantFromPropertyController,
  tenantLeavePropertyController,
} from '../controllers';
import {loggerConfig} from '../../main/config/logger/logger-config';
import {createPropertyValidationChain} from '../validation-chains/create-property';
import {configureRoute} from '../../main/routes/configure-route';
import {HttpRequestMethod} from '../../main/enums/http-request-method';
import {removeTenantFromPropertyValidationChain} from '../validation-chains/remove-tenant-from-property';
import {tenantLeavePropertyValidationChain} from '../validation-chains/tenant-leave-property';
import {inviteTenantsToPropertyValidationChain} from '../validation-chains/invite-tenants-to-property';
import {escalateTenantPrivilegesValidationChain} from '../validation-chains/escalate-tenant-privileges';
import {deescalateTenantPrivilegesValidationChain} from '../validation-chains/deescalate-tenant-privileges';

const router = express.Router();

const logger = loggerConfig();

configureRoute(
    router,
    HttpRequestMethod.GET,
    '/:propertyId',
    true,
    [],
    makeExpressCallback(logger, getPropertyController),
);
configureRoute(
    router,
    HttpRequestMethod.GET,
    '/my/admin',
    true,
    [],
    makeExpressCallback(logger, getPropertiesForUserAsAdminController),
);
configureRoute(
    router,
    HttpRequestMethod.GET,
    '/my/tenant',
    true,
    [],
    makeExpressCallback(logger, getPropertiesForUserAsTenantController),
);
configureRoute(
    router,
    HttpRequestMethod.POST,
    '/create',
    true,
    createPropertyValidationChain,
    makeExpressCallback(logger, createPropertyController),
);
configureRoute(
    router,
    HttpRequestMethod.DELETE,
    '/delete/:propertyId',
    true,
    [],
    makeExpressCallback(logger, deletePropertyController),
);
configureRoute(
    router,
    HttpRequestMethod.PATCH,
    '/remove-tenant',
    true,
    removeTenantFromPropertyValidationChain,
    makeExpressCallback(logger, removeTenantFromPropertyController),
);
configureRoute(
    router,
    HttpRequestMethod.PATCH,
    '/tenant-leave',
    true,
    tenantLeavePropertyValidationChain,
    makeExpressCallback(logger, tenantLeavePropertyController),
);
configureRoute(
    router,
    HttpRequestMethod.PATCH,
    '/tenant-invite',
    true,
    inviteTenantsToPropertyValidationChain,
    makeExpressCallback(logger, inviteTenantsToPropertyController),
);
configureRoute(
    router,
    HttpRequestMethod.GET,
    '/:propertyId/expenses-total/:month/:year',
    true,
    [],
    makeExpressCallback(logger, getPropertyTotalExpensesController),
);
configureRoute(
    router,
    HttpRequestMethod.GET,
    '/:propertyId/expenses-per-tenant/:month/:year',
    true,
    [],
    makeExpressCallback(logger, getPropertyTotalExpensesPerTenantController),
);
configureRoute(
    router,
    HttpRequestMethod.PATCH,
    '/:propertyId/escalate-tenant',
    true,
    escalateTenantPrivilegesValidationChain,
    makeExpressCallback(logger, escalateTenantPrivilegesController),
);
configureRoute(
    router,
    HttpRequestMethod.PATCH,
    '/:propertyId/deescalate-tenant',
    true,
    deescalateTenantPrivilegesValidationChain,
    makeExpressCallback(logger, deescalateTenantPrivilegesController),
);

export {router as PropertiesRouter};
