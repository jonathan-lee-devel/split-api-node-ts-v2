import express from 'express';
// eslint-disable-next-line max-len
import {makeExpressCallback} from '../../main/express-callbacks/express-callback';
// eslint-disable-next-line max-len
import {
  createPropertyController,
  deletePropertyController,
  getPropertiesForUserAsAdminController,
  getPropertiesForUserAsTenantController,
  getPropertyController,
  getPropertyIsAdminController,
  getPropertyTotalExpensesController,
  getPropertyTotalExpensesPerTenantController,
  inviteTenantsToPropertyController,
  removeTenantFromPropertyController,
  tenantLeavePropertyController,
} from '../controllers';
import {loggerConfig} from '../../main/config/logger/logger-config';
// eslint-disable-next-line max-len
import {createPropertyValidationChain} from '../validation-chains/create-property';
import {configureRoute} from '../../main/routes/configure-route';
import {HttpRequestMethod} from '../../main/enums/http-request-method';
// eslint-disable-next-line max-len
import {removeTenantFromPropertyValidationChain} from '../validation-chains/remove-tenant-from-property';
// eslint-disable-next-line max-len
import {tenantLeavePropertyValidationChain} from '../validation-chains/tenant-leave-property';
// eslint-disable-next-line max-len
import {inviteTenantsToPropertyValidationChain} from '../validation-chains/invite-tenants-to-property';

// eslint-disable-next-line new-cap
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
    '/:propertyId/isAdmin',
    true,
    [],
    makeExpressCallback(logger, getPropertyIsAdminController),
);
configureRoute(
    router,
    HttpRequestMethod.GET,
    '/:propertyId/expenses-total',
    true,
    [],
    makeExpressCallback(logger, getPropertyTotalExpensesController),
);
configureRoute(
    router,
    HttpRequestMethod.GET,
    '/:propertyId/expenses-per-tenant',
    true,
    [],
    makeExpressCallback(logger, getPropertyTotalExpensesPerTenantController),
);

export {router as PropertiesRouter};
