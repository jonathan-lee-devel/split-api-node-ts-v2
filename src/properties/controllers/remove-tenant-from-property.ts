import {RemoveTenantFromPropertyFunction} from '../types/remove-tenant-from-property';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

export const makeRemoveTenantFromPropertyController = (
    removeTenantFromProperty: RemoveTenantFromPropertyFunction,
): HttpController => {
  return async function removeTenantFromPropertyController(
      httpRequest: HttpRequest,
  ) {
    const propertyContainer = await removeTenantFromProperty(
        httpRequest.user,
        httpRequest.body.propertyId,
        httpRequest.body.tenantEmailToRemove,
    );
    return {
      httpStatus: propertyContainer.status,
      jsonBody: propertyContainer.data,
    };
  };
};
