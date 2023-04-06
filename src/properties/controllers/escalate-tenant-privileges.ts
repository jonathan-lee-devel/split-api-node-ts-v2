import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';
import {EscalateTenantPrivilegesFunction} from '../types/escalate-tenant-privileges';

export const makeEscalateTenantPrivilegesController = (
    escalateTenantPrivileges: EscalateTenantPrivilegesFunction,
): HttpController => {
  return async function escalateTenantPrivilegesController(
      httpRequest: HttpRequest,
  ) {
    const propertyContainer = await escalateTenantPrivileges(
        httpRequest.user,
        httpRequest.params.propertyId,
        httpRequest.body.tenantEmailToEscalate,
    );
    return {
      httpStatus: propertyContainer.status,
      jsonBody: propertyContainer.data,
    };
  };
};
