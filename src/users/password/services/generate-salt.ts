import bcrypt from 'bcrypt';
import {GenerateSaltFunction} from '../types/generate-salt';

export const makeGenerateSalt = (): GenerateSaltFunction => {
  return async function generateSalt(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      bcrypt.genSalt((err, salt) => {
        if (err) return reject(err);
        return resolve(salt);
      });
    });
  };
};
