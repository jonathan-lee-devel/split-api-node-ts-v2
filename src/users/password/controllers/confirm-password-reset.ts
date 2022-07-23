import {ConfirmPasswordResetFunction} from '../types/confirm-password-reset';
import {HttpController} from '../../../main/types/http-controller';
import {HttpRequest} from '../../../main/types/http-request';

export const makeConfirmPasswordResetController = (
    confirmPasswordReset: ConfirmPasswordResetFunction,
): HttpController => {
  return async function confirmPasswordResetController(
      httpRequest: HttpRequest,
  ) {
    const passwordContainer = await confirmPasswordReset(
        httpRequest.params.tokenValue,
        httpRequest.body.password,
    );
    return {
      httpStatus: passwordContainer.status,
      jsonBody: passwordContainer.data,
    };
  };
};
