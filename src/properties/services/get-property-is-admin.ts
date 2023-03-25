import {Model} from 'mongoose';
import {Property} from '../models/Property';
import {User} from '../../users/main/models/User';
import {GetPropertyIsAdminFunction} from '../types/get-property-is-admin';
import bunyan from 'bunyan';

export const makeGetPropertyIsAdmin = (
    logger: bunyan,
    PropertyModel: Model<Property>,
): GetPropertyIsAdminFunction => {
  return async function getPropertyIsAdmin(
      requestingUser: User,
      propertyId: string,
  ) {
    logger.info(`<${requestingUser.email}> Get property ID: ${propertyId} is admin`);
    const propertyModel = await PropertyModel
        .findOne({id: propertyId}, {__v: 0});
    if (!propertyModel) {
      return false;
    }
    return propertyModel.administratorEmails.includes(requestingUser.email);
  };
};
