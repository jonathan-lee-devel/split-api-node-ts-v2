import {Model} from 'mongoose';
import {Property} from '../models/Property';
import {GetPropertyFunction} from '../types/get-property';
import {User} from '../../users/models/User';

export const makeGetProperty = (
    PropertyModel: Model<Property>,
): GetPropertyFunction => {
  return async function getProperty(
      requestingUser: User,
      propertyId: string,
  ) {
    try {
      const propertyModel = await PropertyModel.findOne({id: propertyId},
          {__v: 0});
      if (!propertyModel) {
        return {
          status: 404,
          data: undefined,
        };
      }
      if (!propertyModel
          .tenantEmails
          .includes(requestingUser.email) &&
                !propertyModel
                    .administratorEmails
                    .includes(requestingUser.email)) {
        return {
          status: 403,
          data: undefined,
        };
      }
      return {
        status: 200,
        data: {
          id: propertyModel.id,
          title: propertyModel.title,
          tenantEmails: propertyModel.tenantEmails,
          acceptedTenantEmails: propertyModel.acceptedTenantEmails,
          createdByEmail: propertyModel.createdByEmail,
          administratorEmails: propertyModel.administratorEmails,
        },
      };
    } catch (err) {
      console.error(`An error has occurred: ${err}`);
      return {
        status: 500,
        data: undefined,
      };
    }
  };
};
