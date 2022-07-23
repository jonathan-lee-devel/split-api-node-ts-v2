import {UpdateProfileFunction} from '../types/update-profile';
import {HttpController} from '../../../main/types/http-controller';
import {HttpRequest} from '../../../main/types/http-request';

export const makeUpdateProfileController = (
    updateProfile: UpdateProfileFunction,
): HttpController => {
  return async function updateProfileController(httpRequest: HttpRequest) {
    const profileContainer = await updateProfile(
        httpRequest.user,
        httpRequest.user.email,
        httpRequest.body.firstname,
        httpRequest.body.lastname,
    );
    return {
      httpStatus: profileContainer.status,
      jsonBody: profileContainer.data,
    };
  };
};
