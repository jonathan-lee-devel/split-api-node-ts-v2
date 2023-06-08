import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Property} from '../models/Property';
import {EscalateTenantPrivilegesFunction} from '../types/escalate-tenant-privileges';
import {User} from '../../users/main/models/User';
import {returnForbidden, returnNotFound} from '../../common/use-cases/status-data-container';
import {errorMessageToDto} from '../../common/use-cases/errors';
import {PropertyInvitationStatus} from '../invitations/enums/PropertyInvitationStatus';
import {HttpStatus} from '../../common/enums/HttpStatus';

export const makeDeescalateTenantPrivileges = (
    logger: bunyan,
    PropertyModel: Model<Property>,
): EscalateTenantPrivilegesFunction => {
  return async function escalateTenantPrivileges(
      requestingUser: User,
      propertyId: string,
      tenantEmailToDeescalate: string,
  ) {
    logger.info(`<${requestingUser.email}> deescalate tenant e-mail: <${tenantEmailToDeescalate}>`);
    const propertyModel = await PropertyModel.findOne({id: propertyId}, {__v: 0});
    if (!propertyModel) {
      return returnNotFound();
    }

    if (!propertyModel.administratorEmails.includes(requestingUser.email)) {
      return returnForbidden();
    }

    if (!propertyModel.administratorEmails.includes(tenantEmailToDeescalate)) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: errorMessageToDto('Tenant is not an administrator of that property'),
      };
    }

    if (propertyModel.administratorEmails.length <= 1) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: errorMessageToDto('Property must have at least one administrator'),
      };
    }

    const tenantEmailIndex =
            propertyModel.administratorEmails.indexOf(tenantEmailToDeescalate, 0);
    if (tenantEmailIndex <= -1) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: errorMessageToDto('Could not remove tenant\'s administrative privileges'),
      };
    }
    propertyModel.administratorEmails.splice(tenantEmailIndex, 1);
    await propertyModel.save();

    return {
      status: HttpStatus.OK,
      data: {
        status: PropertyInvitationStatus[PropertyInvitationStatus.SUCCESS],
        propertyId: undefined,
      },
    };
  };
};
