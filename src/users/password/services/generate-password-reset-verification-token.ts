import {Model} from 'mongoose';
import {randomBytes} from 'crypto';
import {addMinutes} from 'date-fns';
// eslint-disable-next-line max-len
import {PasswordResetVerificationToken} from '../models/PasswordResetVerificationToken';
// eslint-disable-next-line max-len
import {GeneratePasswordResetVerificationTokenFunction} from '../types/generate-password-reset-verification-token';

export const makeGeneratePasswordResetVerificationToken = (
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
      console.error(`An error has occurred: ${err}`);
      return {
        status: 500,
        data: undefined,
      };
    }
  };
};
