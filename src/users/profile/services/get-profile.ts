import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {GetProfileFunction} from '../types/get-profile';
import {User} from '../../main/models/User';

export const makeGetProfile = (
    logger: bunyan,
    UserModel: Model<User>,
): GetProfileFunction => {
  return async function getProfile(requestingUser: User, email: string) {
    if (requestingUser.email !== email) {
      return {
        status: 403,
        data: undefined,
      };
    }
    try {
      const userModel = await UserModel.findOne({email}, {__v: 0});
      if (!userModel) {
        logger.error(`No user profile available for requesting user: ${email}`);
        return {
          status: 500,
          data: undefined,
        };
      }

      return {
        status: 200,
        data: {
          email,
          firstName: userModel.firstName,
          lastName: userModel.lastName,
        },
      };
    } catch (err) {
      logger.error(`An error has occurred: ${err}`);
      return {
        status: 500,
        data: undefined,
      };
    }
  };
};
