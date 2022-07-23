import express from 'express';
import {configureRoute} from '../../../main/routes/configure-route';
import {HttpRequestMethod} from '../../../main/enums/http-request-method';
// eslint-disable-next-line max-len
import {makeExpressCallback} from '../../../main/express-callbacks/express-callback';
import {loggerConfig} from '../../../main/config/logger/logger-config';
// eslint-disable-next-line max-len
import {confirmRegistrationController, registerUserController} from '../controllers';
import {registerUserValidationChain} from '../validation-chains/register-user';

// eslint-disable-next-line new-cap
const router = express.Router();

const logger = loggerConfig();

configureRoute(
    router,
    HttpRequestMethod.POST,
    '/',
    false,
    registerUserValidationChain,
    makeExpressCallback(logger, registerUserController),
);

configureRoute(
    router,
    HttpRequestMethod.GET,
    '/confirm/:tokenValue',
    false,
    [],
    makeExpressCallback(logger, confirmRegistrationController),
);

export {router as RegistrationRouter};
