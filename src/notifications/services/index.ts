import {makeCreateNotification} from './create-notification';
import {generatedId} from '../../util/id/services';
import {NotificationModel} from '../models/Notification';
import {loggerConfig} from '../../main/config/logger/logger-config';
import {makeGetNotificationsForUser} from './get-notifications-for-user';

const logger = loggerConfig();

export const createNotification = makeCreateNotification(
    logger,
    generatedId,
    NotificationModel,
);

export const getNotificationsForUser = makeGetNotificationsForUser(
    logger,
    NotificationModel,
);
