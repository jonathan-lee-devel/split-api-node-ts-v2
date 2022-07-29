import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {DeletePropertyFunction} from '../types/delete-property';
import {User} from '../../users/main/models/User';
import {Property} from '../models/Property';
// eslint-disable-next-line max-len
import {returnForbidden, returnInternalServerError, returnNotFound} from '../../common/use-cases/status-data-container';

export const makeDeleteProperty = (
    logger: bunyan,
    PropertyModel: Model<Property>,
): DeletePropertyFunction => {
  return async function deleteProperty(
      requestingUser: User,
      propertyId: string,
  ) {
    try {
      const propertyModel = await PropertyModel
          .findOne({id: propertyId}, {__v: 0});
      if (!propertyModel) {
        return returnNotFound();
      }

      if (!propertyModel.administratorEmails.includes(requestingUser.email)) {
        return returnForbidden();
      }

      await PropertyModel.deleteOne({id: propertyId});
      return {
        status: 204,
        data: undefined,
      };
    } catch (err) {
      logger.error(`An error has occurred: ${err}`);
      return returnInternalServerError();
    }
  };
};
