import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {randomBytes} from 'crypto';
import {addMinutes} from 'date-fns';
import {PasswordResetVerificationToken} from '../models/PasswordResetVerificationToken';
import {GeneratePasswordResetVerificationTokenFunction} from '../types/generate-password-reset-verification-token';
import {returnInternalServerError} from '../../../common/use-cases/status-data-container';

export const makeGeneratePasswordResetVerificationToken = (
    logger: bunyan,
    PasswordResetVerificationTokenModel: Model<PasswordResetVerificationToken>,
): GeneratePasswordResetVerificationTokenFunction => {
  return async function generateRegistrationVerificationToken(
      tokenSize: number,
      expiryTimeMinutes: number,
      userEmail: string) {
    const passwordResetVerificationToken: PasswordResetVerificationToken = {
      value: randomBytes(tokenSize).toString('hex'),
      expiryDate: addMinutes(new Date(), expiryTimeMinutes),
      userEmail,
    };
    try {
      await new PasswordResetVerificationTokenModel(
          passwordResetVerificationToken,
      ).save();

      return {
        status: 201,
        data: passwordResetVerificationToken,
      };
    } catch (err) {
      logger.error(`An error has occurred: ${err}`);
      return returnInternalServerError();
    }
  };
};
