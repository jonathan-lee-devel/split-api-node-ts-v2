import {makeGetProperty} from './get-property';
import {PropertyModel} from '../models/Property';
import {makeCreateProperty} from './create-property';
import {generatedId} from '../../util/id/services';
import {inviteToProperty} from '../invitations/services';
import {loggerConfig} from '../../main/config/logger/logger-config';
import {makeDeleteProperty} from './delete-property';
import {makeGetPropertiesForUserAsAdmin} from './get-properties-for-user-as-admin';
import {makeGetPropertiesForUserAsTenant} from './get-properties-for-user-as-tenant';
import {makeRemoveTenantFromProperty} from './remove-tenant-from-property';
import {makeGetPropertyTotalExpenses} from './get-property-total-expenses';
import {makeInviteTenantsToProperty} from './invite-tenants-to-property';
import {ExpenseDistributionAssignmentModel} from '../../expenses/models/ExpenseDistributionAssignment';
import {makeGetPropertyTotalExpensesPerTenant} from './get-property-total-expenses-per-tenant';
import {getAggregatedExpensesForMonth} from '../../common/use-cases/properties';
import {makeEscalateTenantPrivileges} from './escalate-tenant-privileges';
import {makeDeescalateTenantPrivileges} from './deescalate-tenant-privileges';

const logger = loggerConfig();

export const getProperty = makeGetProperty(logger, PropertyModel);

export const createProperty = makeCreateProperty(
    logger,
    generatedId,
    PropertyModel,
    inviteToProperty,
);

export const deleteProperty = makeDeleteProperty(logger, PropertyModel);

export const getPropertiesForUserAsAdmin = makeGetPropertiesForUserAsAdmin(
    logger,
    PropertyModel,
);

export const getPropertiesForUserAsTenant = makeGetPropertiesForUserAsTenant(
    logger,
    PropertyModel,
);

export const removeTenantFromProperty = makeRemoveTenantFromProperty(
    logger,
    PropertyModel,
);

export const getPropertyTotalExpenses = makeGetPropertyTotalExpenses(
    logger,
    PropertyModel,
    getAggregatedExpensesForMonth,
);

export const getPropertyTotalExpensesPerTenant =
    makeGetPropertyTotalExpensesPerTenant(
        logger,
        getAggregatedExpensesForMonth,
        ExpenseDistributionAssignmentModel,
    );

export const inviteTenantsToProperty = makeInviteTenantsToProperty(
    logger,
    PropertyModel,
    inviteToProperty,
);

export const escalateTenantPrivileges = makeEscalateTenantPrivileges(
    logger,
    PropertyModel,
);

export const deescalateTenantPrivileges = makeDeescalateTenantPrivileges(
    logger,
    PropertyModel,
);
