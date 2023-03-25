import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Property} from '../models/Property';
import {GetPropertiesForUserAsAdminFunction} from '../types/get-properties-for-user-as-admin';
import {User} from '../../users/main/models/User';
import {PropertyDto} from '../dtos/PropertyDto';

export const makeGetPropertiesForUserAsAdmin = (
    logger: bunyan,
    PropertyModel: Model<Property>,
): GetPropertiesForUserAsAdminFunction => {
  return async function getPropertiesForUserAsAdmin(
      requestingUser: User,
  ) {
    logger.info(`<${requestingUser.email}> Get properties for user as admin`);
    const propertyModels = await PropertyModel
        .find({administratorEmails: requestingUser.email}, {__v: 0});

    const properties: PropertyDto[] = [];

    for (const property of propertyModels) {
      properties.push({
        id: (await property).id,
        title: (await property).title,
        createdByEmail: (await property).createdByEmail,
        administratorEmails: (await property).administratorEmails,
        tenantEmails: (await property).tenantEmails,
        acceptedTenantEmails: (await property).acceptedTenantEmails,
      });
    }

    return {
      status: 200,
      data: properties,
    };
  };
};
