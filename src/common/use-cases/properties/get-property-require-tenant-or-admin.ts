import {Model} from 'mongoose';
import {Property} from '../../../properties/models/Property';
import {User} from '../../../users/main/models/User';
// eslint-disable-next-line max-len
import {GetPropertyRequireTenantOrAdminFunction} from './types/get-property-require-tenant-or-admin';

export const makeGetPropertyRequireTenantOrAdmin = (
    PropertyModel: Model<Property>,
): GetPropertyRequireTenantOrAdminFunction => {
  return async function getPropertyRequireTenantOrAdmin(
      requestingUser: User, propertyId: string,
  ) {
    const propertyModel = await PropertyModel
        .findOne({id: propertyId}, {__v: 0});
    if (!propertyModel) {
      return {
        status: 404,
        data: undefined,
      };
    }
    if (!propertyModel.tenantEmails
        .includes(requestingUser.email) &&
            !propertyModel.administratorEmails
                .includes(requestingUser.email)) {
      return {
        status: 403,
        data: undefined,
      };
    }
    return {
      status: 200,
      data: propertyModel,
    };
  };
};
