import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Property} from '../models/Property';
import {User} from '../../users/main/models/User';
// eslint-disable-next-line max-len
import {InviteToPropertyFunction} from '../invitations/types/invite-to-property';
// eslint-disable-next-line max-len
import {InviteTenantsToPropertyFunction} from '../types/invite-tenants-to-property';

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
    let propertyModel;
    try {
      propertyModel = await PropertyModel
          .findOne({id: propertyId}, {__v: 0});
      if (!propertyModel) {
        return {
          status: 404,
          data: undefined,
        };
      }
      if (!propertyModel.administratorEmails.includes(requestingUser.email)) {
        return {
          status: 403,
          data: undefined,
        };
      }
    } catch (err) {
      logger.error(`An error has occurred: ${err}`);
      return {
        status: 500,
        data: undefined,
      };
    }

    let status = 200;
    for (const tenantEmail of tenantEmails) {
      const propertyInvitationContainer = await inviteToProperty(
          propertyId,
          requestingUser.email,
          tenantEmail,
      );
      if (propertyInvitationContainer.status !== 200) {
        // eslint-disable-next-line max-len
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
