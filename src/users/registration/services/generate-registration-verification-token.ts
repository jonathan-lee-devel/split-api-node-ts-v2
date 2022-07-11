import {Model} from 'mongoose';
// eslint-disable-next-line max-len
import {RegistrationVerificationToken} from '../models/RegistrationVerificationToken';
// eslint-disable-next-line max-len
import {GenerateRegistrationVerificationTokenFunction} from '../types/generate-registration-verification-token';
import {randomBytes} from 'crypto';
import {addMinutes} from 'date-fns';

export const makeGenerateRegistrationVerificationToken = (
    RegistrationVerificationTokenModel: Model<RegistrationVerificationToken>,
): GenerateRegistrationVerificationTokenFunction => {
  return async function generateRegistrationVerificationToken(
      tokenSize: number,
      expiryTimeMinutes: number,
      userEmail: string) {
    const registrationVerificationToken: RegistrationVerificationToken = {
      value: randomBytes(tokenSize).toString('hex'),
      expiryDate: addMinutes(new Date(), expiryTimeMinutes),
      userEmail,
    };
    try {
      await new RegistrationVerificationTokenModel(
          registrationVerificationToken,
      ).save();

      return {
        status: 201,
        data: registrationVerificationToken,
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
