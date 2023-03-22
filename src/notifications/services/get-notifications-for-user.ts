import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Notification} from '../models/Notification';
import {GetNotificationsForUserFunction} from '../types/get-notifications-for-user';
import {User} from '../../users/main/models/User';
import {NotificationDto} from '../dtos/NotificationDto';
import {returnInternalServerError} from '../../common/use-cases/status-data-container';

export const makeGetNotificationsForUser = (
    logger: bunyan,
    NotificationModel: Model<Notification>,
): GetNotificationsForUserFunction => {
  return async function getNotificationsForUser(
      requestingUser: User,
  ) {
    try {
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
        status: 200,
        data: notificationDtos,
      };
    } catch (err) {
      logger.error(`An error has occurred: ${err}`);
      return returnInternalServerError();
    }
  };
};
