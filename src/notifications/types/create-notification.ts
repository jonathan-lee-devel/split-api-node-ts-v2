import {User} from '../../users/main/models/User';
import {NotificationDto} from '../dtos/NotificationDto';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';

export type CreateNotificationFunction = (
    requestingUser: User,
    userEmail: string,
    title: string,
    text: string,
) => Promise<StatusDataContainer<NotificationDto>>;
