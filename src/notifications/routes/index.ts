import express from 'express';
import {configureCreateNotificationRoute} from './create-notification';
import {createNotification} from '../services';

// eslint-disable-next-line new-cap
const router = express.Router();

configureCreateNotificationRoute(
    router,
    '/create',
    createNotification,
);

export {router as NotificationsRouter};
