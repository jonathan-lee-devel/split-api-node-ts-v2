import {makeHandleExistingUser} from './inner/handle-existing-user';
import {UserModel} from '../../models/User';
// eslint-disable-next-line max-len
import {makeGenerateRegistrationVerificationToken} from './generate-registration-verification-token';
// eslint-disable-next-line max-len
import {RegistrationVerificationTokenModel} from '../models/RegistrationVerificationToken';
import {makeRegisterUser} from './register-user';
// eslint-disable-next-line max-len
import {encodePassword, generatePasswordResetVerificationToken} from '../../password/services';
import {sendMail} from '../../../util/email/exports';
// eslint-disable-next-line max-len
import {PasswordResetVerificationTokenModel} from '../../password/models/PasswordResetVerificationToken';
import {makeConfirmRegistration} from './confirm-registration';

const handleExistingUser = makeHandleExistingUser(
    UserModel,
    RegistrationVerificationTokenModel,
    PasswordResetVerificationTokenModel,
);

const generateRegistrationVerificationToken =
    makeGenerateRegistrationVerificationToken(
        RegistrationVerificationTokenModel,
    );

export const registerUser = makeRegisterUser(
    handleExistingUser,
    generateRegistrationVerificationToken,
    generatePasswordResetVerificationToken,
    encodePassword,
    UserModel,
    sendMail,
);

export const confirmRegistration = makeConfirmRegistration(
    RegistrationVerificationTokenModel,
    UserModel,
);
