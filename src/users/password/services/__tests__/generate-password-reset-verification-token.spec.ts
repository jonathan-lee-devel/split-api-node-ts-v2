import {makeGeneratePasswordResetVerificationToken} from '../generate-password-reset-verification-token';
import {DEFAULT_TOKEN_SIZE} from '../../../../util/token/default-token-size';

describe('Generate Password Reset Verification Token Service Tests', () => {
  it('When makeGeneratePasswordResetVerificationToken Then generatePasswordResetVerificationToken', async () => {
    const generatePasswordResetVerificationToken = makeGeneratePasswordResetVerificationToken(
        // @ts-ignore
        {},
        {},
    );

    expect(generatePasswordResetVerificationToken).not.toBeNull();
    expect(generatePasswordResetVerificationToken).toBeInstanceOf(Function);
  });
  it('When generate password reset verification token Then save password reset verification token', async () => {
    let isTokenSaved = false;
    const PasswordResetVerificationTokenModel = function() {
      this.save = () => {
        isTokenSaved = true;
      };
    };
    const generatePasswordResetVerificationToken = makeGeneratePasswordResetVerificationToken(
        {
          // @ts-ignore
          info: () => {
          },
        },
        PasswordResetVerificationTokenModel,
    );

    const result = await generatePasswordResetVerificationToken(DEFAULT_TOKEN_SIZE, 15, 'test@mail.com');

    expect(result.status).toStrictEqual(201);
    expect(result.data.value).toBeDefined();
    expect(result.data.expiryDate.getTime()).toBeGreaterThan(new Date().getTime());
    expect(result.data.userEmail).toStrictEqual('test@mail.com');
    expect(isTokenSaved).toBeTruthy();
  });
});
