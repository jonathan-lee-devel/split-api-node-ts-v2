import bcrypt from 'bcrypt';
import {EncodePasswordFunction} from '../types/encode-password';

export const makeEncodePassword = (
    salt: string,
): EncodePasswordFunction => {
  return async function encodePassword(
      password: string,
  ): Promise<string> {
    return bcrypt.hash(password, salt);
  };
};
