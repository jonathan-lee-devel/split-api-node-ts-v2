import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Notification} from '../models/Notification';
import {GetNotificationsForUserFunction} from '../types/get-notifications-for-user';
import {User} from '../../users/main/models/User';
import {NotificationDto} from '../dtos/NotificationDto';
import {HttpStatus} from '../../common/enums/HttpStatus';

export const makeGetNotificationsForUser = (
    logger: bunyan,
    NotificationModel: Model<Notification>,
): GetNotificationsForUserFunction => {
  return async function getNotificationsForUser(
      requestingUser: User,
  ) {
    logger.info(`Get notifications for user with e-mail: <${requestingUser.email}>`);
    const notifications = await NotificationModel
        .find({userEmail: requestingUser.email}, {__v: 0});
    const notificationDtos: NotificationDto[] = [];
    for (const notification of notifications) {
      notificationDtos.push({
        userEmail: (await notification).userEmail,
        text: (await notification).text,
        title: (await notification).title,
        datetime: (await notification).datetime,
        routerLink: (await notification).routerLink,
        buttonText: (await notification).buttonText,
      });
    }

    return {
      status: HttpStatus.OK,
      data: notificationDtos,
    };
  };
};
