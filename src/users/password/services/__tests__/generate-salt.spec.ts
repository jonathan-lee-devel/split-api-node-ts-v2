import {makeGenerateSalt} from '../generate-salt';

describe('Generate Salt Service Tests', () => {
  it('When makeGenerateSalt Then generateSalt', async () => {
    const generateSalt = makeGenerateSalt();

    expect(generateSalt).not.toBeNull();
    expect(generateSalt).toBeInstanceOf(Function);
  });
});
