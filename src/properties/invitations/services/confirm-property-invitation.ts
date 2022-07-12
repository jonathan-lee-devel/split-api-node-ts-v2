import bunyan from 'bunyan';
import {Model} from 'mongoose';
// eslint-disable-next-line max-len
import {ConfirmPropertyInvitationFunction} from '../types/confirm-property-invitation';
import {StatusDataContainer} from '../../../main/dtos/StatusDataContainer';
import {PropertyInvitationStatus} from '../enums/PropertyInvitationStatus';
import {PropertyInvitationToken} from '../models/PropertyInvitationToken';
import {PropertyInvitation} from '../models/PropertyInvitation';
import {Property} from '../../models/Property';
import {PropertyInvitationStatusDto} from '../dtos/PropertyInvitationStatusDto';

export const makeConfirmPropertyInvitation = (
    logger: bunyan,
    PropertyInvitationTokenModel: Model<PropertyInvitationToken>,
    PropertyInvitationModel: Model<PropertyInvitation>,
    PropertyModel: Model<Property>,
): ConfirmPropertyInvitationFunction => {
  return async function confirmPropertyInvitation(
      tokenValue: string,
  ): Promise<StatusDataContainer<PropertyInvitationStatusDto>> {
    try {
      const token =
                await PropertyInvitationTokenModel
                    .findOne({value: tokenValue}, {__v: 0});
      if (!token) {
        logger
            .error(`Invalid property invitation token provided: ${tokenValue}`);
        return {
          status: 400,
          data: {
            // eslint-disable-next-line max-len
            status: PropertyInvitationStatus[PropertyInvitationStatus.INVALID_TOKEN],
          },
        };
      }

      const invitation =
                await PropertyInvitationModel
                    .findOne({propertyInvitationToken: token}, {__v: 0});
      if (!invitation) {
        logger
        // eslint-disable-next-line max-len
            .error(`Property invitation token: ${tokenValue} without associated invitation`);
        return {
          status: 500,
          data: {
            status: PropertyInvitationStatus[PropertyInvitationStatus.FAILURE],
          },
        };
      }

      if (new Date().getTime() > token.expiryDate.getTime()) {
        return {
          status: 400,
          data: {
            // eslint-disable-next-line max-len
            status: PropertyInvitationStatus[PropertyInvitationStatus.EMAIL_VERIFICATION_EXPIRED],
          },
        };
      }

      const property = await PropertyModel
          .findOne({id: invitation.propertyId}, {__v: 0});
      if (!property) {
        logger
        // eslint-disable-next-line max-len
            .error(`Property with id: ${invitation.propertyId} does not exist for invitation`);
        return {
          status: 400,
          data: {
            status: PropertyInvitationStatus[PropertyInvitationStatus.FAILURE],
          },
        };
      }

      token.expiryDate = new Date();
      invitation.accepted = true;
      property.acceptedTenantEmails.push(invitation.inviteeEmail);
      await token.save();
      await invitation.save();
      await property.save();
      return {
        status: 200,
        data: {
          status: PropertyInvitationStatus[PropertyInvitationStatus.SUCCESS],
        },
      };
    } catch (err) {
      logger.error(`An error has occurred: ${err}`);
      return {
        status: 500,
        data: {
          status: PropertyInvitationStatus[PropertyInvitationStatus.FAILURE],
        },
      };
    }
  };
};
