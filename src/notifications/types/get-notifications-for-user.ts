import {User} from '../../users/main/models/User';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {NotificationDto} from '../dtos/NotificationDto';

export type GetNotificationsForUserFunction = (
    requestingUser: User,
) => Promise<StatusDataContainer<NotificationDto[]>>;
