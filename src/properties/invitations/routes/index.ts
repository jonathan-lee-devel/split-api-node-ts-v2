import express from 'express';
import {loggerConfig} from '../../../main/config/logger/logger-config';
import {configureRoute} from '../../../main/routes/configure-route';
import {HttpRequestMethod} from '../../../main/enums/http-request-method';
import {makeExpressCallback} from '../../../main/express-callbacks/express-callback';
import {confirmPropertyInvitationController} from '../controllers';

const router = express.Router();

const logger = loggerConfig();

configureRoute(
    router,
    HttpRequestMethod.GET,
    '/confirm/:tokenValue',
    false,
    [],
    makeExpressCallback(logger, confirmPropertyInvitationController),
);

export {router as PropertyInvitationsRouter};
