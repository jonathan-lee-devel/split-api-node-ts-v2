import {GetPropertiesForUserAsTenantFunction} from '../types/get-properties-for-user-as-tenant';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

export const makeGetPropertiesForUserAsTenantController = (
    getPropertiesForUserAsTenant: GetPropertiesForUserAsTenantFunction,
): HttpController => {
  return async function getPropertiesForUserAsTenantController(
      httpRequest: HttpRequest,
  ) {
    const propertyContainer = await getPropertiesForUserAsTenant(
        httpRequest.user,
    );
    return {
      httpStatus: propertyContainer.status,
      jsonBody: propertyContainer.data,
    };
  };
};
