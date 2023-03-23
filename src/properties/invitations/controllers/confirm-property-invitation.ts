import {ConfirmPropertyInvitationFunction} from '../types/confirm-property-invitation';
import {HttpController} from '../../../main/types/http-controller';
import {HttpRequest} from '../../../main/types/http-request';

export const makeConfirmPropertyInvitationController = (
    confirmPropertyInvitation: ConfirmPropertyInvitationFunction,
): HttpController => {
  return async function confirmPropertyInvitationController(
      httpRequest: HttpRequest,
  ) {
    const propertyContainer = await confirmPropertyInvitation(
        httpRequest.body.tokenValue,
    );
    return {
      httpStatus: propertyContainer.status,
      jsonBody: propertyContainer.data,
    };
  };
};
