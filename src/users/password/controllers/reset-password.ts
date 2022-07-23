import {ResetPasswordFunction} from '../types/reset-password';
import {HttpController} from '../../../main/types/http-controller';
import {HttpRequest} from '../../../main/types/http-request';

export const makeResetPasswordController = (
    resetPassword: ResetPasswordFunction,
): HttpController => {
  return async function resetPasswordController(httpRequest: HttpRequest) {
    const passwordContainer = await resetPassword(
        httpRequest.body.email,
    );
    return {
      httpStatus: passwordContainer.status,
      jsonBody: passwordContainer.data,
    };
  };
};
