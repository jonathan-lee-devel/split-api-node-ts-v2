import {GetPropertyIsAdminFunction} from '../types/get-property-is-admin';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

export const makeGetPropertyIsAdminController = (
    getPropertyIsAdmin: GetPropertyIsAdminFunction,
): HttpController => {
  return async function getPropertyIsAdminController(httpRequest: HttpRequest) {
    const isAdmin = await getPropertyIsAdmin(
        httpRequest.user,
        httpRequest.params.propertyId,
    );
    return {
      httpStatus: 200,
      jsonBody: isAdmin,
    };
  };
};
