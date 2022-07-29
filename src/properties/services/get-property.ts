import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Property} from '../models/Property';
import {GetPropertyFunction} from '../types/get-property';
import {User} from '../../users/main/models/User';
// eslint-disable-next-line max-len
import {returnForbidden, returnInternalServerError, returnNotFound} from '../../common/use-cases/status-data-container';

export const makeGetProperty = (
    logger: bunyan,
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
      logger.error(`An error has occurred: ${err}`);
      return returnInternalServerError();
    }
  };
};
