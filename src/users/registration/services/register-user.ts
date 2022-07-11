// eslint-disable-next-line max-len
import {Model} from 'mongoose';
// eslint-disable-next-line max-len
import {User} from '../../models/User';
import {SendMailFunction} from '../../../util/email/types/send-mail';
import {RegisterUserFunction} from '../types/register-user';
// eslint-disable-next-line max-len
import {EncodePasswordFunction} from '../../password/types/encode-password';
import {HandleExistingUserFunction} from '../types/inner/handle-existing-user';
import {RegistrationStatus} from '../enums/RegistrationStatus';
// eslint-disable-next-line max-len
import {GenerateRegistrationVerificationTokenFunction} from '../types/generate-registration-verification-token';
import {
  GeneratePasswordResetVerificationTokenFunction,
} from '../../password/types/generate-password-reset-verification-token';
import {DEFAULT_TOKEN_SIZE} from '../../../util/token/default-token-size';
// eslint-disable-next-line max-len
import {DEFAULT_TOKEN_EXPIRY_TIME_MINUTES} from '../../../util/token/default-token-expiry-time-minutes';

export const makeRegisterUser = (
    handleExistingUser: HandleExistingUserFunction,
    generateRegistrationVerificationToken:
        GenerateRegistrationVerificationTokenFunction,
    generatePasswordResetVerificationToken:
        GeneratePasswordResetVerificationTokenFunction,
    encodePassword: EncodePasswordFunction,
    UserModel: Model<User>,
    sendMail: SendMailFunction,
): RegisterUserFunction => {
  return async function registerUser(
      email: string,
      firstName: string,
      lastName: string,
      password: string,
  ) {
    if (await handleExistingUser(email)) {
      return {
        status: 400,
        data: {
          status: RegistrationStatus[RegistrationStatus.USER_ALREADY_EXISTS],
        },
      };
    }
    const registrationVerificationTokenContainer =
            await generateRegistrationVerificationToken(
                DEFAULT_TOKEN_SIZE,
                DEFAULT_TOKEN_EXPIRY_TIME_MINUTES,
                email,
            );
    const expiredPasswordResetVerificationTokenContainer =
            await generatePasswordResetVerificationToken(
                DEFAULT_TOKEN_SIZE,
                0,
                email,
            );
    if (registrationVerificationTokenContainer.status !== 201 ||
            expiredPasswordResetVerificationTokenContainer.status !== 201) {
      return {
        status: 500,
        data: {
          status: RegistrationStatus[RegistrationStatus.FAILURE],
        },
      };
    }
    const newUser: User = {
      email,
      firstName,
      lastName,
      password: await encodePassword(password),
      emailVerified: false,
    };
    try {
      await new UserModel(newUser).save();
    } catch (err) {
      console.error(`An error has occurred: ${err}`);
      return {
        status: 500,
        data: {
          status: RegistrationStatus[RegistrationStatus.FAILURE],
        },
      };
    }

    // Mail is slow to send and can be sent asynchronously, hence, no await
    sendMail(email, 'Registration Confirmation',
        // @ts-ignore
        // eslint-disable-next-line max-len
        `<h4>Please click the following link to verify your account: <a href="${process.env.FRONT_END_URL}/register/verify/${registrationVerificationTokenContainer.data.value}">Verify Account</a></h4>`);

    return {
      status: 200,
      data: {
        status:
        // eslint-disable-next-line max-len
                    RegistrationStatus[RegistrationStatus.AWAITING_EMAIL_VERIFICATION],
      },
    };
  };
};
