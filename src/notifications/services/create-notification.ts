import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {GenerateIdFunction} from '../../util/id/types/generate-id';
import {CreateNotificationFunction} from '../types/create-notification';
import {User} from '../../users/main/models/User';
import {DEFAULT_ID_LENGTH} from '../../util/id/constants/default-id-length';
import {Notification} from '../models/Notification';

export const makeCreateNotification = (
    logger: bunyan,
    generateId: GenerateIdFunction,
    NotificationModel: Model<Notification>,
): CreateNotificationFunction => {
  return async function createNotification(
      requestingUser: User,
      userEmail: string,
      title: string,
      text: string,
  ) {
    const id = await generateId(DEFAULT_ID_LENGTH);
    const datetime = new Date();
    const notificationModel: Notification = {
      id,
      userEmail,
      title,
      text,
      isRead: false,
      datetime,
      routerLink: undefined,
      buttonText: undefined,
    };

    try {
      await new NotificationModel(notificationModel).save();
      return {
        status: 201,
        data: {
          userEmail,
          title,
          text,
          isRead: false,
          datetime,
          routerLink: undefined,
          buttonText: undefined,
        },
      };
    } catch (err) {
      logger.error(`An error has occurred: ${err}`);
      return {
        status: 500,
        data: undefined,
      };
    }
  };
};
