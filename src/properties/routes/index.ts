import express from 'express';
import {configureGetPropertyRoute} from './get-property';
import {
  deleteProperty,
  getPropertiesForUserAsAdmin,
  getPropertiesForUserAsTenant,
  getProperty,
  getPropertyIsAdmin,
  getPropertyTotalExpenses,
  getPropertyTotalExpensesPerTenant,
  removeTenantFromProperty,
} from '../services';
import {verifyEmail} from '../../util/email/exports';
import {inviteToProperty} from '../invitations/services';
import {configureDeletePropertyRoute} from './delete-property';
// eslint-disable-next-line max-len
import {configureGetPropertiesForUserAsAdminRoute} from './get-properties-for-user-as-admin';
// eslint-disable-next-line max-len
import {configureGetPropertiesForUserAsTenantRoute} from './get-properties-for-user-as-tenant';
// eslint-disable-next-line max-len
import {configureRemoveTenantFromPropertyRoute} from './remove-tenant-from-property';
import {configureTenantLeavePropertyRoute} from './tenant-leave-property';
// eslint-disable-next-line max-len
import {configureInviteTenantsToPropertyRoute} from './invite-tenants-to-property';
import {configureGetPropertyIsAdminRoute} from './get-property-is-admin';
// eslint-disable-next-line max-len
import {configureGetPropertyTotalExpensesRoute} from './get-property-total-expenses';
// eslint-disable-next-line max-len
import {configureGetPropertyTotalExpensesPerTenantRoute} from './get-property-total-expenses-per-tenant';
// eslint-disable-next-line max-len
import {makeExpressCallback} from '../../main/express-callbacks/express-callback';
import {createPropertyController} from '../controllers';
import {loggerConfig} from '../../main/config/logger/logger-config';
// eslint-disable-next-line max-len
import {createPropertyValidationChain} from '../validation-chains/create-property';
import {configureRoute} from '../../main/routes/configure-route';
import {RequestMethod} from '../../main/enums/request-method';

// eslint-disable-next-line new-cap
const router = express.Router();

const logger = loggerConfig();

configureGetPropertyRoute(router, '/:propertyId', getProperty);
configureGetPropertiesForUserAsAdminRoute(
    router,
    '/my/admin',
    getPropertiesForUserAsAdmin,
);
configureGetPropertiesForUserAsTenantRoute(
    router,
    '/my/tenant',
    getPropertiesForUserAsTenant,
);
configureRoute(
    router,
    RequestMethod.POST,
    '/create',
    true,
    createPropertyValidationChain,
    makeExpressCallback(logger, createPropertyController),
);

configureDeletePropertyRoute(router, '/delete/:propertyId', deleteProperty);
configureRemoveTenantFromPropertyRoute(
    router,
    '/remove-tenant',
    removeTenantFromProperty,
);
configureTenantLeavePropertyRoute(
    router,
    '/tenant-leave',
    removeTenantFromProperty,
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
