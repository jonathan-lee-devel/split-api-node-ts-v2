import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {ResetPasswordFunction} from '../types/reset-password';
import {User} from '../../main/models/User';
import {PasswordResetStatus} from '../enums/PasswordResetStatus';
import {PasswordResetVerificationToken} from '../models/PasswordResetVerificationToken';
import {GeneratePasswordResetVerificationTokenFunction} from '../types/generate-password-reset-verification-token';
import {DEFAULT_TOKEN_SIZE} from '../../../util/token/default-token-size';
import {DEFAULT_TOKEN_EXPIRY_TIME_MINUTES} from '../../../util/token/default-token-expiry-time-minutes';
import {SendMailFunction} from '../../../util/email/types/send-mail';
import {HttpStatus} from '../../../common/enums/HttpStatus';

export const makeResetPassword = (
    logger: bunyan,
    UserModel: Model<User>,
    PasswordResetVerificationTokenModel: Model<PasswordResetVerificationToken>,
    generatePasswordResetVerificationToken:
        GeneratePasswordResetVerificationTokenFunction,
    sendMail: SendMailFunction,
): ResetPasswordFunction => {
  return async function resetPassword(
      email: string,
  ) {
    logger.info(`Request to reset password for e-mail: <${email}>`);
    const userModel = await UserModel.findOne({email}, {__v: 0});
    if (!userModel) {
      return {
        status: HttpStatus.OK,
        data: {
          status: PasswordResetStatus[
              PasswordResetStatus.AWAITING_EMAIL_VERIFICATION
          ],
        },
      };
    }

    const passwordResetVerificationTokenModel =
            await PasswordResetVerificationTokenModel
                .findOne({userEmail: email}, {__v: 0});
    if (!passwordResetVerificationTokenModel) {
      logger.error(`Password reset token does not exist for user: ${email}`);
      return {
        status: HttpStatus.OK,
        data: {
          status: PasswordResetStatus[
              PasswordResetStatus.AWAITING_EMAIL_VERIFICATION
          ],
        },
      };
    }


    const passwordResetVerificationTokenContainer =
            await generatePasswordResetVerificationToken(
                DEFAULT_TOKEN_SIZE,
                DEFAULT_TOKEN_EXPIRY_TIME_MINUTES,
                email,
            );
    if (passwordResetVerificationTokenContainer.status !== 201) {
      logger.error(`generatePasswordResetVerificationToken returned ${
        passwordResetVerificationTokenContainer.status
      }`);
      return {
        status: HttpStatus.OK,
        data: {
          status: PasswordResetStatus[
              PasswordResetStatus.AWAITING_EMAIL_VERIFICATION
          ],
        },
      };
    }
    await PasswordResetVerificationTokenModel
        .deleteOne({value: passwordResetVerificationTokenModel.value});
    // Mail is slow to send and can be sent asynchronously, hence, no await
    sendMail(email, 'Password Reset',
        `<h4>Please click the following link to reset your password: ${process.env.FRONT_END_URL}/password/reset/confirm?token=${passwordResetVerificationTokenContainer.data.value}</h4>`);
    return {
      status: HttpStatus.OK,
      data: {
        status: PasswordResetStatus[
            PasswordResetStatus.AWAITING_EMAIL_VERIFICATION
        ],
      },
    };
  };
};
