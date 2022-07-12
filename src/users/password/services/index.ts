import {makeGenerateSalt} from './generate-salt';
import {makeEncodePassword} from './encode-password';
// eslint-disable-next-line max-len
import {makeGeneratePasswordResetVerificationToken} from './generate-password-reset-verification-token';
// eslint-disable-next-line max-len
import {PasswordResetVerificationTokenModel} from '../models/PasswordResetVerificationToken';
import {makeResetPassword} from './reset-password';
import {UserModel} from '../../main/models/User';
import {sendMail} from '../../../util/email/exports';
import {makeConfirmPasswordReset} from './confirm-password-reset';

const generateSalt = makeGenerateSalt();

export const encodePassword = makeEncodePassword(await generateSalt());

export const generatePasswordResetVerificationToken =
    makeGeneratePasswordResetVerificationToken(
        PasswordResetVerificationTokenModel,
    );

export const resetPassword = makeResetPassword(
    UserModel,
    PasswordResetVerificationTokenModel,
    generatePasswordResetVerificationToken,
    sendMail,
);

export const confirmPasswordReset = makeConfirmPasswordReset(
    PasswordResetVerificationTokenModel,
    UserModel,
    encodePassword,
);
