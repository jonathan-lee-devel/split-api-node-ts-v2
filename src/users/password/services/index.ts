import {makeGenerateSalt} from './generate-salt';
import {makeEncodePassword} from './encode-password';
// eslint-disable-next-line max-len
import {makeGeneratePasswordResetVerificationToken} from './generate-password-reset-verification-token';
// eslint-disable-next-line max-len
import {PasswordResetVerificationTokenModel} from '../models/PasswordResetVerificationToken';

const generateSalt = makeGenerateSalt();

export const encodePassword = makeEncodePassword(await generateSalt());

export const generatePasswordResetVerificationToken =
    makeGeneratePasswordResetVerificationToken(
        PasswordResetVerificationTokenModel,
    );
