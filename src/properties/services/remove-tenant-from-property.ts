import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {RemoveTenantFromPropertyFunction} from '../types/remove-tenant-from-property';
import {User} from '../../users/main/models/User';
import {Property} from '../models/Property';
import {returnForbidden} from '../../common/use-cases/status-data-container';
import {HttpStatus} from '../../common/enums/HttpStatus';

export const makeRemoveTenantFromProperty = (
    logger: bunyan,
    PropertyModel: Model<Property>,
): RemoveTenantFromPropertyFunction => {
  return async function removeTenantFromProperty(
      requestingUser: User,
      propertyId: string,
      tenantEmailToRemove: string,
  ) {
    logger.info(`<${requestingUser.email}> remove tenant <${tenantEmailToRemove}> from property with ID: ${propertyId}`);
    const propertyModel = await PropertyModel
        .findOne({id: propertyId}, {__v: 0});
    if (!propertyModel) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: undefined,
      };
    }

    if (requestingUser.email !== tenantEmailToRemove &&
            !propertyModel.administratorEmails
                .includes(requestingUser.email)) {
      return returnForbidden();
    }

    const tenantEmailIndex =
            propertyModel.tenantEmails.indexOf(tenantEmailToRemove, 0);
    if (tenantEmailIndex <= -1) {
      return {
        status: HttpStatus.BAD_REQUEST,
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
      status: HttpStatus.NO_CONTENT,
      data: undefined,
    };
  };
};
