import {makeGenerateRegistrationVerificationToken} from '../generate-registration-verification-token';
import {DEFAULT_TOKEN_SIZE} from '../../../../util/token/default-token-size';

describe('Generate Registration Verification Token Tests', () => {
  it('When makeGenerateRegistrationVerificationToken Then generateRegistrationVerificationToken', async () => {
    const generateRegistrationVerificationToken = makeGenerateRegistrationVerificationToken(
        // @ts-ignore
        {},
        {},
    );

    expect(generateRegistrationVerificationToken).not.toBeNull();
    expect(generateRegistrationVerificationToken).toBeInstanceOf(Function);
  });
  it('When generate registration verification token Then registratoin verification token generated', async () => {
    const RegistrationVerificationTokenModel = function() {
      this.save = () => {
      };
    };
    const generateRegistrationVerificationToken = makeGenerateRegistrationVerificationToken(
        // @ts-ignore
        {},
        RegistrationVerificationTokenModel,
    );

    const result = await generateRegistrationVerificationToken(
        DEFAULT_TOKEN_SIZE, 15, 'test@mail.com',
    );

    expect(result.status).toStrictEqual(201);
    expect(result.data.userEmail).toStrictEqual('test@mail.com');
    expect(result.data.value).toHaveLength(DEFAULT_TOKEN_SIZE);
  });
});
