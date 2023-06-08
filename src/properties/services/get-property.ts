import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Property} from '../models/Property';
import {GetPropertyFunction} from '../types/get-property';
import {User} from '../../users/main/models/User';
import {returnForbidden, returnNotFound} from '../../common/use-cases/status-data-container';
import {HttpStatus} from '../../common/enums/HttpStatus';

export const makeGetProperty = (
    logger: bunyan,
    PropertyModel: Model<Property>,
): GetPropertyFunction => {
  return async function getProperty(
      requestingUser: User,
      propertyId: string,
  ) {
    logger.info(`<${requestingUser.email}> Get property with ID: ${propertyId}`);
    const propertyModel = await PropertyModel.findOne({id: propertyId},
        {__v: 0});
    if (!propertyModel) {
      return returnNotFound();
    }
    if (!propertyModel
        .tenantEmails
        .includes(requestingUser.email) &&
            !propertyModel
                .administratorEmails
                .includes(requestingUser.email)) {
      return returnForbidden();
    }
    return {
      status: HttpStatus.OK,
      data: {
        id: propertyModel.id,
        title: propertyModel.title,
        tenantEmails: propertyModel.tenantEmails,
        acceptedTenantEmails: propertyModel.acceptedTenantEmails,
        createdByEmail: propertyModel.createdByEmail,
        administratorEmails: propertyModel.administratorEmails,
      },
    };
  };
};
