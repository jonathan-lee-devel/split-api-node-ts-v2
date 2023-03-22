import {InviteTenantsToPropertyFunction} from '../types/invite-tenants-to-property';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

export const makeInviteTenantsToPropertyController = (
    inviteTenantsToProperty: InviteTenantsToPropertyFunction,
): HttpController => {
  return async function inviteTenantsToPropertyController(
      httpRequest: HttpRequest,
  ) {
    const propertyContainer = await inviteTenantsToProperty(
        httpRequest.user,
        httpRequest.body.propertyId,
        httpRequest.body.tenantEmails,
    );
    return {
      httpStatus: propertyContainer.status,
      jsonBody: propertyContainer.data,
    };
  };
};
