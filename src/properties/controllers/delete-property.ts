import {DeletePropertyFunction} from '../types/delete-property';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

export const makeDeletePropertyController = (
    deleteProperty: DeletePropertyFunction,
): HttpController => {
  return async function deletePropertyController(httpRequest: HttpRequest) {
    const propertyContainer = await deleteProperty(
        httpRequest.user,
        httpRequest.params.propertyId,
    );
    return {
      httpStatus: propertyContainer.status,
      jsonBody: propertyContainer.data,
    };
  };
};
