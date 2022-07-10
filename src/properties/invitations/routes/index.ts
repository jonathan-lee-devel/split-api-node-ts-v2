import express from 'express';
// eslint-disable-next-line max-len
import {configureConfirmPropertyInvitationRoute} from './confirm-property-invitation';
import {confirmPropertyInvitation} from '../services';

// eslint-disable-next-line new-cap
const router = express.Router();

configureConfirmPropertyInvitationRoute(
    router,
    '/confirm/:tokenValue',
    confirmPropertyInvitation,
);

export {router as PropertyInvitationsRouter};
