import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {UpdateProfileFunction} from '../types/update-profile';
import {User} from '../../main/models/User';
import {returnForbidden, returnInternalServerError} from '../../../common/use-cases/status-data-container';
import {HttpStatus} from '../../../common/enums/HttpStatus';

export const makeUpdateProfile = (
    logger: bunyan,
    UserModel: Model<User>,
): UpdateProfileFunction => {
  return async function updateProfile(
      requestingUser: User,
      email: string,
      firstName: string,
      lastName: string) {
    logger.info(`<${requestingUser.email}> Update profile for <${email}>`);
    if (requestingUser.email !== email) {
      return returnForbidden();
    }
    const userModel = await UserModel.findOne({email}, {__v: 0});
    if (!userModel) {
      logger.error(`No user profile available for requesting user: ${email}`);
      return returnInternalServerError();
    }

    userModel.firstName = firstName;
    userModel.lastName = lastName;
    await userModel.save();
    return {
      status: HttpStatus.OK,
      data: {
        email,
        firstName,
        lastName,
      },
    };
  };
};
