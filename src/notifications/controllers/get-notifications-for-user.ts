// eslint-disable-next-line max-len
import {GetNotificationsForUserFunction} from '../types/get-notifications-for-user';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

export const makeGetNotificationsForUserController = (
    getNotificationsForUser: GetNotificationsForUserFunction,
): HttpController => {
  return async function getNotificationsForUserController(
      httpRequest: HttpRequest,
  ) {
    const notificationsContainer = await getNotificationsForUser(
        httpRequest.user,
    );
    return {
      httpStatus: notificationsContainer.status,
      jsonBody: notificationsContainer.data,
    };
  };
};
