import {Model} from 'mongoose';
import {ResetPasswordFunction} from '../types/reset-password';
import {User} from '../../main/models/User';
import {PasswordResetStatus} from '../enums/PasswordResetStatus';
// eslint-disable-next-line max-len
import {PasswordResetVerificationToken} from '../models/PasswordResetVerificationToken';
// eslint-disable-next-line max-len
import {GeneratePasswordResetVerificationTokenFunction} from '../types/generate-password-reset-verification-token';
import {DEFAULT_TOKEN_SIZE} from '../../../util/token/default-token-size';
// eslint-disable-next-line max-len
import {DEFAULT_TOKEN_EXPIRY_TIME_MINUTES} from '../../../util/token/default-token-expiry-time-minutes';
import {SendMailFunction} from '../../../util/email/types/send-mail';

export const makeResetPassword = (
    UserModel: Model<User>,
    PasswordResetVerificationTokenModel: Model<PasswordResetVerificationToken>,
    generatePasswordResetVerificationToken:
        GeneratePasswordResetVerificationTokenFunction,
    sendMail: SendMailFunction,
): ResetPasswordFunction => {
  return async function resetPassword(
      email: string,
  ) {
    try {
      const userModel = await UserModel.findOne({email}, {__v: 0});
      if (!userModel) {
        return {
          status: 200,
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
        console.error(`Password reset token does not exist for user: ${email}`);
        return {
          status: 200,
          data: {
            status: PasswordResetStatus[
                PasswordResetStatus.AWAITING_EMAIL_VERIFICATION
            ],
          },
        };
      }

      await PasswordResetVerificationTokenModel
          .deleteOne({value: passwordResetVerificationTokenModel.value});
      const passwordResetVerificationTokenContainer =
                await generatePasswordResetVerificationToken(
                    DEFAULT_TOKEN_SIZE,
                    DEFAULT_TOKEN_EXPIRY_TIME_MINUTES,
                    email,
                );
      if (passwordResetVerificationTokenContainer.status !== 201) {
        console.error(`generatePasswordResetVerificationToken returned ${
          passwordResetVerificationTokenContainer.status
        }`);
        return {
          status: 200,
          data: {
            status: PasswordResetStatus[
                PasswordResetStatus.AWAITING_EMAIL_VERIFICATION
            ],
          },
        };
      }
      // Mail is slow to send and can be sent asynchronously, hence, no await
      sendMail(email, 'Password Reset',
          // eslint-disable-next-line max-len
          `<h4>Please click the following link to reset your password: ${process.env.FRONT_END_URL}/password/reset/confirm?token=${passwordResetVerificationTokenContainer.data.value}</h4>`);
      return {
        status: 200,
        data: {
          status: PasswordResetStatus[
              PasswordResetStatus.AWAITING_EMAIL_VERIFICATION
          ],
        },
      };
    } catch (err) {
      console.error(`An error has occurred: ${err}`);
      return {
        status: 500,
        data: undefined,
      };
    }
  };
};
