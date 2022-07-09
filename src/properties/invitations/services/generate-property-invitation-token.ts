import {randomBytes} from 'crypto';
import {addDays} from 'date-fns';
// eslint-disable-next-line max-len
import {GeneratePropertyInvitationTokenFunction} from '../types/generate-property-invitation-token';

export const makeGeneratePropertyInvitationToken = ()
    : GeneratePropertyInvitationTokenFunction => {
  return async function generatePropertyInvitationToken(
      propertyId: string,
      tokenSize: number,
      expiryTimeDays: number) {
    return {
      propertyId,
      value: randomBytes(tokenSize).toString('hex'),
      expiryDate: addDays(new Date(), expiryTimeDays),
    };
  };
};
