import {GetPropertiesForUserAsAdminFunction} from '../types/get-properties-for-user-as-admin';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

export const makeGetPropertiesForUserAsAdminController = (
    getPropertiesForUserAsAdmin: GetPropertiesForUserAsAdminFunction,
): HttpController => {
  return async function getPropertiesForUserAsAdminController(
      httpRequest: HttpRequest,
  ) {
    const propertyContainer = await getPropertiesForUserAsAdmin(
        httpRequest.user,
    );
    return {
      httpStatus: propertyContainer.status,
      jsonBody: propertyContainer.data,
    };
  };
};
