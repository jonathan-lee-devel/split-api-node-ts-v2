import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {randomBytes} from 'crypto';
import {addMinutes} from 'date-fns';
import {PasswordResetVerificationToken} from '../models/PasswordResetVerificationToken';
import {GeneratePasswordResetVerificationTokenFunction} from '../types/generate-password-reset-verification-token';
import {HttpStatus} from '../../../common/enums/HttpStatus';

export const makeGeneratePasswordResetVerificationToken = (
    logger: bunyan,
    PasswordResetVerificationTokenModel: Model<PasswordResetVerificationToken>,
): GeneratePasswordResetVerificationTokenFunction => {
  return async function generateRegistrationVerificationToken(
      tokenSize: number,
      expiryTimeMinutes: number,
      userEmail: string) {
    logger.info(`Generate password reset verification token for user e-mail: <${userEmail}>`);
    const passwordResetVerificationToken: PasswordResetVerificationToken = {
      value: randomBytes(tokenSize).toString('hex'),
      expiryDate: addMinutes(new Date(), expiryTimeMinutes),
      userEmail,
    };
    await new PasswordResetVerificationTokenModel(
        passwordResetVerificationToken,
    ).save();

    return {
      status: HttpStatus.CREATED,
      data: passwordResetVerificationToken,
    };
  };
};
