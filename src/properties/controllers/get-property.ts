import {GetPropertyFunction} from '../types/get-property';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

export const makeGetPropertyController = (
    getProperty: GetPropertyFunction,
): HttpController => {
  return async function getPropertyController(httpRequest: HttpRequest) {
    const propertyContainer = await getProperty(
        httpRequest.user,
        httpRequest.params.propertyId,
    );
    return {
      httpStatus: propertyContainer.status,
      jsonBody: propertyContainer.data,
    };
  };
};
