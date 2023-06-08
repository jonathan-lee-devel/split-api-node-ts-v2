import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {DeletePropertyFunction} from '../types/delete-property';
import {User} from '../../users/main/models/User';
import {Property} from '../models/Property';
import {returnForbidden, returnNotFound} from '../../common/use-cases/status-data-container';
import {HttpStatus} from '../../common/enums/HttpStatus';

export const makeDeleteProperty = (
    logger: bunyan,
    PropertyModel: Model<Property>,
): DeletePropertyFunction => {
  return async function deleteProperty(
      requestingUser: User,
      propertyId: string,
  ) {
    logger.info(`<${requestingUser.email}> Delete property with ID: ${propertyId}`);
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
      status: HttpStatus.NO_CONTENT,
      data: undefined,
    };
  };
};
