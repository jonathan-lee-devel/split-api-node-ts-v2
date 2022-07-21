import {makeCreatePropertyController} from './create-property';
import {
  createProperty,
  deleteProperty,
  getPropertiesForUserAsAdmin,
  getPropertiesForUserAsTenant,
  getProperty,
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
