import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {randomBytes} from 'crypto';
import {addMinutes} from 'date-fns';
import {RegistrationVerificationToken} from '../models/RegistrationVerificationToken';
import {GenerateRegistrationVerificationTokenFunction} from '../types/generate-registration-verification-token';
import {HttpStatus} from '../../../common/enums/HttpStatus';

export const makeGenerateRegistrationVerificationToken = (
    logger: bunyan,
    RegistrationVerificationTokenModel: Model<RegistrationVerificationToken>,
): GenerateRegistrationVerificationTokenFunction => {
  /**
     * @param {number} tokenSize must be a multiple of 2 to get exact size
     * @param {number} expiryTimeMinutes number of minutes from current datetime to expire
     * @param {string} userEmail e-mail of the user to generate token for
     * @return {Promise<StatusDataContainer<RegistrationVerificationToken>>} generated token
     */
  return async function generateRegistrationVerificationToken(
      tokenSize: number,
      expiryTimeMinutes: number,
      userEmail: string) {
    logger.info(`Generate registration verification token for <${userEmail}>`);
    const registrationVerificationToken: RegistrationVerificationToken = {
      value: randomBytes(tokenSize / 2).toString('hex'),
      expiryDate: addMinutes(new Date(), expiryTimeMinutes),
      userEmail,
    };
    await new RegistrationVerificationTokenModel(
        registrationVerificationToken,
    ).save();

    return {
      status: HttpStatus.CREATED,
      data: registrationVerificationToken,
    };
  };
};
