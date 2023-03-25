import {makeEncodePassword} from '../encode-password';
import {makeGenerateSalt} from '../generate-salt';

describe('Encode Password Service Tests', () => {
  it('When makeEncodePassword Then encodePassword', async () => {
    const encodePassword = makeEncodePassword('salt');

    expect(encodePassword).not.toBeNull();
    expect(encodePassword).toBeInstanceOf(Function);
  });
  it('When encodePassword Then return promise of string', async () => {
    const generateSalt = makeGenerateSalt();
    const encodePassword = makeEncodePassword(await generateSalt());

    const result = await encodePassword('password');

    expect(result).toBeDefined();
  });
});
