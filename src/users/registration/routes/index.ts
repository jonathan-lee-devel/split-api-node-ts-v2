import express from 'express';
import {configureRegisterUserRoute} from './register-user';
import {confirmRegistration, registerUser} from '../services';
import {configureConfirmRegistrationRoute} from './confirm-registration';

// eslint-disable-next-line new-cap
const router = express.Router();

configureRegisterUserRoute(
    router,
    '/',
    registerUser,
);

configureConfirmRegistrationRoute(
    router,
    '/confirm/:tokenValue',
    confirmRegistration,
);

export {router as RegistrationRouter};
