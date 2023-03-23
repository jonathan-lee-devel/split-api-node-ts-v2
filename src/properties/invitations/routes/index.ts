import express from 'express';
import {loggerConfig} from '../../../main/config/logger/logger-config';
import {configureRoute} from '../../../main/routes/configure-route';
import {HttpRequestMethod} from '../../../main/enums/http-request-method';
import {makeExpressCallback} from '../../../main/express-callbacks/express-callback';
import {confirmPropertyInvitationController} from '../controllers';
import {confirmPropertyInvitationValidationChain} from '../validation-chains/confirm-property-invitation';

const router = express.Router();

const logger = loggerConfig();

configureRoute(
    router,
    HttpRequestMethod.POST,
    '/confirm',
    false,
    confirmPropertyInvitationValidationChain,
    makeExpressCallback(logger, confirmPropertyInvitationController),
);

export {router as PropertyInvitationsRouter};
