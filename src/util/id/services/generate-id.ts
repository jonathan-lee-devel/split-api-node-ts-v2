import crypto from 'crypto';
import {GenerateIdFunction} from '../types/generate-id';

export const makeGenerateId = (): GenerateIdFunction => {
  return async function generateId(idLength): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      crypto.randomBytes(idLength, (err, buffer) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        return resolve(buffer.toString('hex'));
      });
    });
  };
};
