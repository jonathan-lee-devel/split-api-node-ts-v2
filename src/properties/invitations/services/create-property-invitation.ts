import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {GenerateIdFunction} from '../../../util/id/types/generate-id';
import {DEFAULT_ID_LENGTH} from '../../../util/id/constants/default-id-length';
import {DEFAULT_TOKEN_SIZE} from '../../../util/token/default-token-size';
import {DEFAULT_TOKEN_EXPIRY_TIME_DAYS} from '../../../util/token/default-token-expiry-time-days';
import {GeneratePropertyInvitationTokenFunction} from '../types/generate-property-invitation-token';
import {CreatePropertyInvitationFunction} from '../types/create-property-invitation';
import {StatusDataContainer} from '../../../main/dtos/StatusDataContainer';
import {PropertyInvitationDto} from '../dtos/PropertyInvitationDto';
import {PropertyInvitation} from '../models/PropertyInvitation';
import {PropertyInvitationToken} from '../models/PropertyInvitationToken';

export const makeCreatePropertyInvitation = (
    logger: bunyan,
    generateId: GenerateIdFunction,
    generatePropertyInvitationToken: GeneratePropertyInvitationTokenFunction,
    PropertyInvitationTokenModel: Model<PropertyInvitationToken>,
    PropertyInvitationModel: Model<PropertyInvitation>,
): CreatePropertyInvitationFunction => {
  return async function createPropertyInvitation(
      propertyId: string,
      inviterEmail: string,
      inviteeEmail: string)
        : Promise<StatusDataContainer<PropertyInvitationDto>> {
    const propertyInvitation: PropertyInvitation = {
      id: await generateId(DEFAULT_ID_LENGTH),
      propertyId,
      inviterEmail,
      inviteeEmail,
      accepted: false,
      propertyInvitationToken: null,
    };
    const propertyInvitationToken = await generatePropertyInvitationToken(
        propertyId,
        DEFAULT_TOKEN_SIZE,
        DEFAULT_TOKEN_EXPIRY_TIME_DAYS,
    );

    try {
      propertyInvitation.propertyInvitationToken =
                await new PropertyInvitationTokenModel(propertyInvitationToken)
                    .save();
      await new PropertyInvitationModel(propertyInvitation).save();

      return {
        status: 201,
        data: {
          id: propertyInvitation.id,
          propertyId,
          inviterEmail,
          inviteeEmail,
          accepted: propertyInvitation.accepted,
          propertyInvitationToken: {
            propertyId,
            expiryDate: propertyInvitationToken.expiryDate.toDateString(),
            value: propertyInvitationToken.value,
          },
        },
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
