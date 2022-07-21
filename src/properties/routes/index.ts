import express from 'express';
// eslint-disable-next-line max-len
import {getPropertyIsAdmin, getPropertyTotalExpenses, getPropertyTotalExpensesPerTenant} from '../services';
import {verifyEmail} from '../../util/email/exports';
import {inviteToProperty} from '../invitations/services';
// eslint-disable-next-line max-len
import {configureInviteTenantsToPropertyRoute} from './invite-tenants-to-property';
import {configureGetPropertyIsAdminRoute} from './get-property-is-admin';
// eslint-disable-next-line max-len
import {configureGetPropertyTotalExpensesRoute} from './get-property-total-expenses';
// eslint-disable-next-line max-len
import {configureGetPropertyTotalExpensesPerTenantRoute} from './get-property-total-expenses-per-tenant';
// eslint-disable-next-line max-len
import {makeExpressCallback} from '../../main/express-callbacks/express-callback';
// eslint-disable-next-line max-len
import {
  createPropertyController,
  deletePropertyController,
  getPropertiesForUserAsAdminController,
  getPropertiesForUserAsTenantController,
  getPropertyController,
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
configureInviteTenantsToPropertyRoute(
    router,
    '/tenant-invite',
    verifyEmail,
    inviteToProperty,
);
configureGetPropertyIsAdminRoute(
    router,
    '/:propertyId/isAdmin',
    getPropertyIsAdmin,
);
configureGetPropertyTotalExpensesRoute(
    router,
    '/:propertyId/expenses-total',
    getPropertyTotalExpenses,
);
configureGetPropertyTotalExpensesPerTenantRoute(
    router,
    '/:propertyId/expenses-per-tenant',
    getPropertyTotalExpensesPerTenant,
);

export {router as PropertiesRouter};
