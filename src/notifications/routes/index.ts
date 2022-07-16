import express from 'express';
import {configureCreateNotificationRoute} from './create-notification';
import {createNotification, getNotificationsForUser} from '../services';
// eslint-disable-next-line max-len
import {configureGetNotificationsForUserRoute} from './get-notifications-for-user';

// eslint-disable-next-line new-cap
const router = express.Router();

configureCreateNotificationRoute(
    router,
    '/create',
    createNotification,
);

configureGetNotificationsForUserRoute(
    router,
    '/',
    getNotificationsForUser,
);

export {router as NotificationsRouter};
