import bunyan from 'bunyan';
import {Model} from 'mongoose';
// eslint-disable-next-line max-len
import {RemoveTenantFromPropertyFunction} from '../types/remove-tenant-from-property';
import {User} from '../../users/main/models/User';
import {Property} from '../models/Property';

export const makeRemoveTenantFromProperty = (
    logger: bunyan,
    PropertyModel: Model<Property>,
): RemoveTenantFromPropertyFunction => {
  return async function removeTenantFromProperty(
      requestingUser: User,
      propertyId: string,
      tenantEmailToRemove: string,
  ) {
    try {
      const propertyModel = await PropertyModel
          .findOne({id: propertyId}, {__v: 0});
      if (!propertyModel) {
        return {
          status: 400,
          data: undefined,
        };
      }

      if (requestingUser.email !== tenantEmailToRemove &&
                !propertyModel.administratorEmails
                    .includes(requestingUser.email)) {
        return {
          status: 403,
          data: undefined,
        };
      }

      const tenantEmailIndex =
                propertyModel.tenantEmails.indexOf(tenantEmailToRemove, 0);
      if (tenantEmailIndex <= -1) {
        return {
          status: 400,
          data: undefined,
        };
      }
      propertyModel.tenantEmails.splice(tenantEmailIndex, 1);
      const acceptedTenantEmailIndex =
                propertyModel.acceptedTenantEmails
                    .indexOf(tenantEmailToRemove, 0);
      if (acceptedTenantEmailIndex > -1) {
        propertyModel.acceptedTenantEmails.splice(acceptedTenantEmailIndex, 1);
      }
      await propertyModel.save();
      return {
        status: 204,
        data: undefined,
      };
    } catch (err) {
      logger.error(`An error has occurred: ${err}`);
      return {
        status: 500,
        data: undefined,
      };
    }
  };
};
