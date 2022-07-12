import {Router} from 'express';
import {UpdateProfileFunction} from '../types/update-profile';
import {isLoggedIn} from '../../../main/config/auth/is-logged-in';
import {body} from 'express-validator';

export const configureUpdateProfileRoute = (
    router: Router,
    path: string,
    updateProfile: UpdateProfileFunction,
) => {
  router.patch(path,
      body('firstname', 'A first name must be provided')
          .exists(),
      body('lastname', 'A last name must be provided')
          .exists(),
      isLoggedIn, async (req, res, _next) => {
        // @ts-ignore
        const {email} = req.user;
        const {firstname, lastname} = req.body;

        const profileContainer = await updateProfile(
            // @ts-ignore
            req.user,
            email,
            firstname,
            lastname);

        return res
            .status(profileContainer.status)
            .json(profileContainer.data);
      });
};
