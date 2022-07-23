import express from 'express';
import {loggerConfig} from '../../../main/config/logger/logger-config';
import {configureRoute} from '../../../main/routes/configure-route';
import {HttpRequestMethod} from '../../../main/enums/http-request-method';
// eslint-disable-next-line max-len
import {resetPasswordValidationChain} from '../validation-chains/reset-password';
// eslint-disable-next-line max-len
import {makeExpressCallback} from '../../../main/express-callbacks/express-callback';
// eslint-disable-next-line max-len
import {confirmPasswordResetController, resetPasswordController} from '../controllers';
// eslint-disable-next-line max-len
import {confirmPasswordResetValidationChain} from '../validation-chains/confirm-password-reset';

// eslint-disable-next-line new-cap
const router = express.Router();

const logger = loggerConfig();

configureRoute(
    router,
    HttpRequestMethod.POST,
    '/reset',
    false,
    resetPasswordValidationChain,
    makeExpressCallback(logger, resetPasswordController),
);

configureRoute(
    router,
    HttpRequestMethod.POST,
    '/reset/confirm/:tokenValue',
    false,
    confirmPasswordResetValidationChain,
    makeExpressCallback(logger, confirmPasswordResetController),
);

export {router as PasswordResetRouter};
