import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Property} from '../models/Property';
import {EscalateTenantPrivilegesFunction} from '../types/escalate-tenant-privileges';
import {User} from '../../users/main/models/User';
import {returnForbidden, returnNotFound} from '../../common/use-cases/status-data-container';
import {errorMessageToDto} from '../../common/use-cases/errors';
import {PropertyInvitationStatus} from '../invitations/enums/PropertyInvitationStatus';
import {HttpStatus} from '../../common/enums/HttpStatus';

export const makeEscalateTenantPrivileges = (
    logger: bunyan,
    PropertyModel: Model<Property>,
): EscalateTenantPrivilegesFunction => {
  return async function escalateTenantPrivileges(
      requestingUser: User,
      propertyId: string,
      tenantEmailToEscalate: string,
  ) {
    logger.info(`<${requestingUser.email}> escalate tenant e-mail: <${tenantEmailToEscalate}>`);
    const propertyModel = await PropertyModel.findOne({id: propertyId}, {__v: 0});
    if (!propertyModel) {
      return returnNotFound();
    }

    if (!propertyModel.administratorEmails.includes(requestingUser.email)) {
      return returnForbidden();
    }

    if (propertyModel.administratorEmails.includes(tenantEmailToEscalate)) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: errorMessageToDto('Tenant is already an administrator of that property'),
      };
    }

    propertyModel.administratorEmails.push(tenantEmailToEscalate);
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
