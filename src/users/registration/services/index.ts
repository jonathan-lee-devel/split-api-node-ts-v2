import {makeHandleExistingUser} from './inner/handle-existing-user';
import {UserModel} from '../../main/models/User';
import {makeGenerateRegistrationVerificationToken} from './generate-registration-verification-token';
import {RegistrationVerificationTokenModel} from '../models/RegistrationVerificationToken';
import {makeRegisterUser} from './register-user';
import {encodePassword, generatePasswordResetVerificationToken} from '../../password/services';
import {sendMail} from '../../../util/email/exports';
import {PasswordResetVerificationTokenModel} from '../../password/models/PasswordResetVerificationToken';
import {makeConfirmRegistration} from './confirm-registration';
import {loggerConfig} from '../../../main/config/logger/logger-config';

const logger = loggerConfig();

const handleExistingUser = makeHandleExistingUser(
    logger,
    UserModel,
    RegistrationVerificationTokenModel,
    PasswordResetVerificationTokenModel,
);

const generateRegistrationVerificationToken =
    makeGenerateRegistrationVerificationToken(
        logger,
        RegistrationVerificationTokenModel,
    );

export const registerUser = makeRegisterUser(
    logger,
    handleExistingUser,
    generateRegistrationVerificationToken,
    generatePasswordResetVerificationToken,
    encodePassword,
    UserModel,
    sendMail,
);

export const confirmRegistration = makeConfirmRegistration(
    logger,
    RegistrationVerificationTokenModel,
    UserModel,
);
