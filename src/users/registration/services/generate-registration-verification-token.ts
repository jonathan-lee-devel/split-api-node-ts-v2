import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {randomBytes} from 'crypto';
import {addMinutes} from 'date-fns';
import {RegistrationVerificationToken} from '../models/RegistrationVerificationToken';
import {GenerateRegistrationVerificationTokenFunction} from '../types/generate-registration-verification-token';
import {returnInternalServerError} from '../../../common/use-cases/status-data-container';

export const makeGenerateRegistrationVerificationToken = (
    logger: bunyan,
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
      logger.error(`An error has occurred: ${err}`);
      return returnInternalServerError();
    }
  };
};
