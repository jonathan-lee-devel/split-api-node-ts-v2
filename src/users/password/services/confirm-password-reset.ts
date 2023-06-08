import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {ConfirmPasswordResetFunction} from '../types/confirm-password-reset';
import {PasswordResetVerificationToken} from '../models/PasswordResetVerificationToken';
import {PasswordResetStatus} from '../enums/PasswordResetStatus';
import {User} from '../../main/models/User';
import {EncodePasswordFunction} from '../types/encode-password';
import {HttpStatus} from '../../../common/enums/HttpStatus';

export const makeConfirmPasswordReset = (
    logger: bunyan,
    PasswordResetVerificationTokenModel: Model<PasswordResetVerificationToken>,
    UserModel: Model<User>,
    encodePassword: EncodePasswordFunction,
): ConfirmPasswordResetFunction => {
  return async function confirmPasswordReset(
      tokenValue: string,
      password: string) {
    const tokenModel = await PasswordResetVerificationTokenModel
        .findOne({value: tokenValue}, {__v: 0});
    if (!tokenModel) {
      logger.info(`No token exists with value: ${tokenValue}`);
      return {
        status: HttpStatus.BAD_REQUEST,
        data: {
          status: PasswordResetStatus[PasswordResetStatus.INVALID_TOKEN],
        },
      };
    }

    const userModel = await UserModel
        .findOne({email: tokenModel.userEmail}, {__v: 0});
    if (!userModel) {
      logger.error(`No user exists for token with value: ${tokenValue}`);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        data: {
          status: PasswordResetStatus[PasswordResetStatus.FAILURE],
        },
      };
    }

    if (tokenModel.expiryDate.getTime() < new Date().getTime()) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: {
          status: PasswordResetStatus[
              PasswordResetStatus.EMAIL_VERIFICATION_EXPIRED
          ],
        },
      };
    }
    userModel.password = await encodePassword(password);
    await userModel.save();
    tokenModel.expiryDate = new Date();
    await tokenModel.save();
    logger.info(`Successfully updated password for: <${userModel.email}>`);
    return {
      status: HttpStatus.OK,
      data: {
        status: PasswordResetStatus[PasswordResetStatus.SUCCESS],
      },
    };
  };
};
