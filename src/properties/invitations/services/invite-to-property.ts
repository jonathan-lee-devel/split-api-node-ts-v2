import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Property} from '../../models/Property';
import {InviteToPropertyFunction} from '../types/invite-to-property';
import {StatusDataContainer} from '../../../main/dtos/StatusDataContainer';
import {PropertyInvitationDto} from '../dtos/PropertyInvitationDto';
import {CreatePropertyInvitationFunction} from '../types/create-property-invitation';
import {SendPropertyInvitationFunction} from '../types/send-property-invitation';

export const makeInviteToProperty = (
    logger: bunyan,
    PropertyModel: Model<Property>,
    createPropertyInvitation: CreatePropertyInvitationFunction,
    sendPropertyInvitation: SendPropertyInvitationFunction,
): InviteToPropertyFunction => {
  return async function(
      propertyId: string,
      inviterEmail: string,
      inviteeEmail: string,
  ): Promise<StatusDataContainer<PropertyInvitationDto>> {
    try {
      const property = await PropertyModel
          .findOne({id: propertyId}, {__v: 0});
      if (!property) {
        logger.error(`Cannot invite to property with ID: ${propertyId} as does not exist`);
        return {
          status: 400,
          data: undefined,
        };
      }

      property.tenantEmails.push(inviteeEmail);
      await property.save();
    } catch (err) {
      logger.error(`An error has occurred: ${err}`);
      return {
        status: 500,
        data: undefined,
      };
    }

    const propertyInvitationContainer =
            await createPropertyInvitation(
                propertyId,
                inviterEmail,
                inviteeEmail,
            );
    if (propertyInvitationContainer.status === 201) {
      await sendPropertyInvitation(
          propertyInvitationContainer.data.propertyInvitationToken.value,
          inviterEmail,
          inviteeEmail,
      );
      return {
        status: 200,
        data: {
          id: propertyInvitationContainer.data.id,
          propertyId,
          inviterEmail,
          inviteeEmail,
          accepted: propertyInvitationContainer.data.accepted,
          propertyInvitationToken: {
            ...propertyInvitationContainer.data.propertyInvitationToken,
          },
        },
      };
    }
    logger.error(`An error has occurred, createPropertyInvitation returned status: ${propertyInvitationContainer.status}`);
    return {
      status: 500,
      data: undefined,
    };
  };
};
