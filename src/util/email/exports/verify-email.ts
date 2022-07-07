import {VerifyEmailFunction} from '../types/verify-email';

export const makeVerifyEmail = (): VerifyEmailFunction => {
  return function(emailToVerify: string): boolean {
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegexp.test(emailToVerify);
  };
};
