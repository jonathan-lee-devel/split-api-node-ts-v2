import {randomBytes} from 'crypto';
import {addDays} from 'date-fns';
import {GeneratePropertyInvitationTokenFunction} from '../types/generate-property-invitation-token';

export const makeGeneratePropertyInvitationToken = ()
    : GeneratePropertyInvitationTokenFunction => {
  return async function generatePropertyInvitationToken(
      propertyId: string,
      tokenSize: number,
      expiryTimeDays: number) {
    return {
      propertyId,
      value: randomBytes(tokenSize / 2).toString('hex'),
      expiryDate: addDays(new Date(), expiryTimeDays),
    };
  };
};
