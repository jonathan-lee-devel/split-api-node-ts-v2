// eslint-disable-next-line max-len
import {makeGetNotificationsForUserController} from './get-notifications-for-user';
import {getNotificationsForUser} from '../services';

export const getNotificationsForUserController =
    makeGetNotificationsForUserController(getNotificationsForUser);
