import {makeConfirmPasswordReset} from '../confirm-password-reset';
import {PasswordResetStatus} from '../../enums/PasswordResetStatus';

describe('Password Reset Confirm Service Tests', () => {
  it('When makeConfirmPasswordReset Then confirmPasswordReset', async () => {
    const confirmPasswordReset = makeConfirmPasswordReset(
        // @ts-ignore
        {},
        {},
        {},
        () => {
        },
    );

    expect(confirmPasswordReset).not.toBeNull();
    expect(confirmPasswordReset).toBeInstanceOf(Function);
  });
  it('When token not found Then bad request invalid token', async () => {
    const confirmPasswordReset = makeConfirmPasswordReset(
        {
          // @ts-ignore
          info: () => {
          },
        },
        {
          findOne: () => undefined,
        },
        {},
        () => {
        },
    );

    const result = await confirmPasswordReset('12345', 'password');

    expect(result.status).toStrictEqual(400);
    expect(result.data.status).toStrictEqual(PasswordResetStatus[PasswordResetStatus.INVALID_TOKEN]);
  });
  it('When user not found for token Then internal server error and failure', async () => {
    const confirmPasswordReset = makeConfirmPasswordReset(
        {
          // @ts-ignore
          error: () => {
          },
        },
        {
          findOne: () => {
            return {};
          },
        },
        {
          findOne: () => undefined,
        },
        () => {
        },
    );

    const result = await confirmPasswordReset('12345', 'password');

    expect(result.status).toStrictEqual(500);
    expect(result.data.status).toStrictEqual(PasswordResetStatus[PasswordResetStatus.FAILURE]);
  });
  it('When token expired Then bad request email verification expired', async () => {
    const confirmPasswordReset = makeConfirmPasswordReset(
        // @ts-ignore
        {},
        {
          findOne: () => {
            return {
              expiryDate: {
                getTime: () => 0,
              },
            };
          },
        },
        {
          findOne: () => {
            return {};
          },
        },
        () => {
        },
    );

    const result = await confirmPasswordReset('12345', 'password');

    expect(result.status).toStrictEqual(400);
    expect(result.data.status).toStrictEqual(PasswordResetStatus[PasswordResetStatus.EMAIL_VERIFICATION_EXPIRED]);
  });
  it('When password reset success Then password encoded, user saved, token saved, status success', async () => {
    let isTokenSaved = false;
    let isUserSaved = false;
    let isPasswordEncoded = false;
    const confirmPasswordReset = makeConfirmPasswordReset(
        // @ts-ignore
        {},
        {
          findOne: () => {
            return {
              expiryDate: {
                getTime: () => new Date().getTime() + 10_000,
              },
              save: () => {
                isTokenSaved = true;
              },
            };
          },

        },
        {
          findOne: () => {
            return {
              save: () => {
                isUserSaved = true;
              },
            };
          },

        },
        () => {
          isPasswordEncoded = true;
        },
    );

    const result = await confirmPasswordReset('12345', 'password');

    expect(result.status).toStrictEqual(200);
    expect(result.data.status).toStrictEqual(PasswordResetStatus[PasswordResetStatus.SUCCESS]);
    expect(isTokenSaved).toBeTruthy();
    expect(isUserSaved).toBeTruthy();
    expect(isPasswordEncoded).toBeTruthy();
  });
});
