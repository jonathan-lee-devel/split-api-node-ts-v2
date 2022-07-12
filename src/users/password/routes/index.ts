import express from 'express';
import {configureResetPasswordRoute} from './reset-password';
import {configureConfirmPasswordResetRoute} from './confirm-password-reset';
import {confirmPasswordReset, resetPassword} from '../services';

// eslint-disable-next-line new-cap
const router = express.Router();

configureResetPasswordRoute(
    router,
    '/reset',
    resetPassword,
);

configureConfirmPasswordResetRoute(
    router,
    '/reset/confirm/:tokenValue',
    confirmPasswordReset,
);

export {router as PasswordResetRouter};
