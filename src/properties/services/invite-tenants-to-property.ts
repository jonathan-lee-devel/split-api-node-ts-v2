import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Property} from '../models/Property';
import {User} from '../../users/main/models/User';
import {InviteToPropertyFunction} from '../invitations/types/invite-to-property';
import {InviteTenantsToPropertyFunction} from '../types/invite-tenants-to-property';
import {returnForbidden, returnNotFound} from '../../common/use-cases/status-data-container';

export const makeInviteTenantsToProperty = (
    logger: bunyan,
    PropertyModel: Model<Property>,
    inviteToProperty: InviteToPropertyFunction,
): InviteTenantsToPropertyFunction => {
  return async function inviteTenantsToProperty(
      requestingUser: User,
      propertyId: string,
      tenantEmails: string[],
  ) {
    logger.info(`<${requestingUser.email}> invite tenants: ${JSON.stringify(tenantEmails)} to property with ID: ${propertyId}`);
    const propertyModel = await PropertyModel
        .findOne({id: propertyId}, {__v: 0});
    if (!propertyModel) {
      return returnNotFound();
    }
    if (!propertyModel.administratorEmails.includes(requestingUser.email)) {
      return returnForbidden();
    }

    let status = 200;
    for (const tenantEmail of tenantEmails) {
      const propertyInvitationContainer = await inviteToProperty(
          propertyId,
          requestingUser.email,
          tenantEmail,
      );
      if (propertyInvitationContainer.status !== 200) {
        logger.error(`Failed to invite tenant ${tenantEmail} to property: ${propertyId}`);
        status = 500;
      }
    }

    return {
      status,
      data: {
        id: propertyModel.id,
        title: propertyModel.title,
        tenantEmails: propertyModel.tenantEmails,
        acceptedTenantEmails: propertyModel.acceptedTenantEmails,
        administratorEmails: propertyModel.administratorEmails,
        createdByEmail: propertyModel.createdByEmail,
      },
    };
  };
};
