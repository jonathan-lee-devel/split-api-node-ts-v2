import {makeGetProperty} from './get-property';
import {PropertyModel} from '../models/Property';
import {makeCreateProperty} from './create-property';
import {generatedId} from '../../util/id/services';
import {inviteToProperty} from '../invitations/services';
import {loggerConfig} from '../../main/config/logger/logger-config';
import {makeDeleteProperty} from './delete-property';
// eslint-disable-next-line max-len
import {makeGetPropertiesForUserAsAdmin} from './get-properties-for-user-as-admin';
// eslint-disable-next-line max-len
import {makeGetPropertiesForUserAsTenant} from './get-properties-for-user-as-tenant';
import {makeRemoveTenantFromProperty} from './remove-tenant-from-property';
import {makeGetPropertyIsAdmin} from './get-property-is-admin';

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

export const getPropertyIsAdmin = makeGetPropertyIsAdmin(PropertyModel);
