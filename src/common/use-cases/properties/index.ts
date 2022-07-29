// eslint-disable-next-line max-len
import {makeGetPropertyRequireTenantOrAdmin} from './get-property-require-tenant-or-admin';
import {PropertyModel} from '../../../properties/models/Property';

export const getPropertyRequireTenantOrAdmin =
    makeGetPropertyRequireTenantOrAdmin(PropertyModel);
