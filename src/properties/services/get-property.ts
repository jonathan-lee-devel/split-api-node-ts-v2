import {Model} from 'mongoose';
import {Property} from '../models/Property';
import {GetPropertyFunction} from '../types/get-property';

export const makeGetProperty = (
    PropertyModel: Model<Property>,
): GetPropertyFunction => {
  return async function getProperty(propertyId: string) {
    try {
      const propertyModel = await PropertyModel.findOne({id: propertyId});
      if (!propertyModel) {
        return {
          status: 404,
          data: undefined,
        };
      }
      return {
        status: 200,
        data: {
          id: propertyModel.id,
          title: propertyModel.title,
          tenantEmails: propertyModel.tenantEmails,
          admin: propertyModel.admin.toString(),
          createdBy: propertyModel.createdBy,
        },
      };
    } catch (err) {
      console.error(err);
      return {
        status: 500,
        data: undefined,
      };
    }
  };
};
