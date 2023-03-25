import {makeResetPassword} from '../reset-password';
import {PasswordResetStatus} from '../../enums/PasswordResetStatus';

describe('Reset Password Service Tests', () => {
  it('When makeResetPassword Then resetPassword', async () => {
    const resetPassword = makeResetPassword(
        // @ts-ignore
        {},
        {},
        {},
        () => {
        },
        () => {
        },
    );

    expect(resetPassword).not.toBeNull();
    expect(resetPassword).toBeInstanceOf(Function);
  });
  it('When user does not exist Then return status awaiting email verification', async () => {
    const resetPassword = makeResetPassword(
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
        () => {
        },
    );

    const result = await resetPassword('test@mail.com');

    expect(result.status).toStrictEqual(200);
    expect(result.data.status).toStrictEqual(PasswordResetStatus[PasswordResetStatus.AWAITING_EMAIL_VERIFICATION]);
  });
  it('When password reset token does not exist Then log error and return status awaiting email verification', async () => {
    let isErrorLogged = false;
    const resetPassword = makeResetPassword(
        {
          // @ts-ignore
          info: () => {
          },
          // @ts-ignore
          error: () => {
            isErrorLogged = true;
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
        () => {
        },
    );

    const result = await resetPassword('test@mail.com');

    expect(isErrorLogged).toBeTruthy();
    expect(result.status).toStrictEqual(200);
    expect(result.data.status).toStrictEqual(PasswordResetStatus[PasswordResetStatus.AWAITING_EMAIL_VERIFICATION]);
  });
  it('When password reset token fails to generate Then log error and return status awaiting email verification', async () => {
    let isErrorLogged = false;
    const resetPassword = makeResetPassword(
        {
          // @ts-ignore
          info: () => {
          },
          // @ts-ignore
          error: () => {
            isErrorLogged = true;
          },
        },
        {
          findOne: () => {
            return {};
          },
        },
        {
          findOne: () => {
            return {};
          },
        },
        () => {
          return {
            status: 500,
          };
        },
        () => {
        },
    );

    const result = await resetPassword('test@mail.com');

    expect(isErrorLogged).toBeTruthy();
    expect(result.status).toStrictEqual(200);
    expect(result.data.status).toStrictEqual(PasswordResetStatus[PasswordResetStatus.AWAITING_EMAIL_VERIFICATION]);
  });
  it('When password reset successful Then send email and status awaiting email verification', async () => {
    let sentEmail: string = '';
    let sentSubject: string = '';
    let isTokenDeleted: boolean = false;
    const resetPassword = makeResetPassword(
        {
          // @ts-ignore
          info: () => {
          },
        },
        {
          findOne: () => {
            return {};
          },
        },
        {
          findOne: () => {
            return {};
          },
          deleteOne: () => {
            isTokenDeleted = true;
          },
        },
        () => {
          return {
            status: 201,
            data: {
              value: '12345',
            },
          };
        },
        (email, subject, _) => {
          sentEmail = email;
          sentSubject = subject;
        },
    );

    const result = await resetPassword('test@mail.com');

    expect(sentEmail).toStrictEqual('test@mail.com');
    expect(sentSubject).toStrictEqual('Password Reset');
    expect(isTokenDeleted).toBeTruthy();
    expect(result.status).toStrictEqual(200);
    expect(result.data.status).toStrictEqual(PasswordResetStatus[PasswordResetStatus.AWAITING_EMAIL_VERIFICATION]);
  });
});
