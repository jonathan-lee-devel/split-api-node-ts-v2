import {HttpRequest} from '../../main/types/http-request';
import {CreatePropertyFunction} from '../types/create-property';
import {HttpController} from '../../main/types/http-controller';

export const makeCreatePropertyController = (
    createProperty: CreatePropertyFunction,
): HttpController => {
  return async function createPropertyController(httpRequest: HttpRequest) {
    const propertyContainer = await createProperty(
        httpRequest.user,
        httpRequest.body.title,
        httpRequest.body.tenantEmails,
    );
    return {
      httpStatus: propertyContainer.status,
      jsonBody: propertyContainer.data,
    };
  };
};
