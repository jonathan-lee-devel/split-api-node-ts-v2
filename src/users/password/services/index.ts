import {makeGenerateSalt} from './generate-salt';
import {makeEncodePassword} from './encode-password';
import {makeGeneratePasswordResetVerificationToken} from './generate-password-reset-verification-token';
import {PasswordResetVerificationTokenModel} from '../models/PasswordResetVerificationToken';
import {makeResetPassword} from './reset-password';
import {UserModel} from '../../main/models/User';
import {sendMail} from '../../../util/email/exports';
import {makeConfirmPasswordReset} from './confirm-password-reset';
import {loggerConfig} from '../../../main/config/logger/logger-config';

const logger = loggerConfig();

const generateSalt = makeGenerateSalt();

export const encodePassword = makeEncodePassword(await generateSalt());

export const generatePasswordResetVerificationToken =
    makeGeneratePasswordResetVerificationToken(
        logger,
        PasswordResetVerificationTokenModel,
    );

export const resetPassword = makeResetPassword(
    logger,
    UserModel,
    PasswordResetVerificationTokenModel,
    generatePasswordResetVerificationToken,
    sendMail,
);

export const confirmPasswordReset = makeConfirmPasswordReset(
    logger,
    PasswordResetVerificationTokenModel,
    UserModel,
    encodePassword,
);
