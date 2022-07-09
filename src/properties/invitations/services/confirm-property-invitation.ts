import {Model} from 'mongoose';
// eslint-disable-next-line max-len
import {ConfirmPropertyInvitationFunction} from '../types/confirm-property-invitation';
import {StatusDataContainer} from '../../../main/dtos/StatusDataContainer';
import {PropertyInvitationStatus} from '../enums/PropertyInvitationStatus';
import {PropertyInvitationToken} from '../models/PropertyInvitationToken';
import {PropertyInvitation} from '../models/PropertyInvitation';

export const makeConfirmPropertyInvitation = (
    PropertyInvitationTokenModel: Model<PropertyInvitationToken>,
    PropertyInvitationModel: Model<PropertyInvitation>,
): ConfirmPropertyInvitationFunction => {
  return async function confirmPropertyInvitation(
      tokenValue: string,
  ): Promise<StatusDataContainer<PropertyInvitationStatus>> {
    try {
      const token =
          await PropertyInvitationTokenModel
              .findOne({value: tokenValue}, {__v: 0});
      if (!token) {
        console
            .error(`Invalid property invitation token provided: ${tokenValue}`);
        return {
          status: 400,
          data: PropertyInvitationStatus.INVALID_TOKEN,
        };
      }

      const invitation =
          await PropertyInvitationModel
              .findOne({propertyInvitationToken: token}, {__v: 0});
      if (!invitation) {
        console
            // eslint-disable-next-line max-len
            .error(`Property invitation token: ${tokenValue} without associated invitation`);
        return {
          status: 500,
          data: PropertyInvitationStatus.FAILURE,
        };
      }

      if (new Date().getTime() > token.expiryDate.getTime()) {
        return {
          status: 400,
          data: PropertyInvitationStatus.EMAIL_VERIFICATION_EXPIRED,
        };
      }

      token.expiryDate = new Date();
      invitation.accepted = true;
      await token.save();
      await invitation.save();
      return {
        status: 200,
        data: PropertyInvitationStatus.SUCCESS,
      };
    } catch (err) {
      console.error(`An error has occurred: ${err}`);
      return {
        status: 500,
        data: PropertyInvitationStatus.FAILURE,
      };
    }
  };
};
