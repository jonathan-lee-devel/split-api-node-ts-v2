import express from 'express';
// eslint-disable-next-line max-len
import {loggerConfig} from '../../../main/config/logger/logger-config';
import {configureRoute} from '../../../main/routes/configure-route';
import {HttpRequestMethod} from '../../../main/enums/http-request-method';
// eslint-disable-next-line max-len
import {makeExpressCallback} from '../../../main/express-callbacks/express-callback';
import {confirmPropertyInvitationController} from '../controllers';

// eslint-disable-next-line new-cap
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
