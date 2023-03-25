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
      _requestingUser: User,
      userEmail: string,
      title: string,
      text: string,
      routerLink: string | undefined,
      buttonText: string | undefined,
  ) {
    const id = await generateId(DEFAULT_ID_LENGTH);
    logger.info(`Generating notification with ID: ${id}`);
    const datetime = new Date();
    const notificationModel: Notification = {
      id,
      userEmail,
      title,
      text,
      isRead: false,
      datetime,
      routerLink,
      buttonText,
    };

    await new NotificationModel(notificationModel).save();
    return {
      status: 201,
      data: {
        userEmail,
        title,
        text,
        isRead: false,
        datetime,
        routerLink,
        buttonText,
      },
    };
  };
};
