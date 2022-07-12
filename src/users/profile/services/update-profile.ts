import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {UpdateProfileFunction} from '../types/update-profile';
import {User} from '../../main/models/User';

export const makeUpdateProfile = (
    logger: bunyan,
    UserModel: Model<User>,
): UpdateProfileFunction => {
  return async function updateProfile(
      requestingUser: User,
      email: string,
      firstName: string,
      lastName: string) {
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

      userModel.firstName = firstName;
      userModel.lastName = lastName;
      await userModel.save();
      return {
        status: 200,
        data: {
          email,
          firstName,
          lastName,
        },
      };
    } catch (err) {
      return {
        status: 500,
        data: undefined,
      };
    }
  };
};
