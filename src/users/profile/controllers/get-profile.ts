import {GetProfileFunction} from '../types/get-profile';
import {HttpController} from '../../../main/types/http-controller';
import {HttpRequest} from '../../../main/types/http-request';

export const makeGetProfileController = (
    getProfile: GetProfileFunction,
): HttpController => {
  return async function getProfileController(httpRequest: HttpRequest) {
    const profileContainer = await getProfile(
        httpRequest.user,
        httpRequest.user.email,
    );
    return {
      httpStatus: profileContainer.status,
      jsonBody: profileContainer.data,
    };
  };
};
