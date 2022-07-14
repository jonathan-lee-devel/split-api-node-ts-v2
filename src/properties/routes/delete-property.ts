import {Router} from 'express';
import {DeletePropertyFunction} from '../types/delete-property';
import {isLoggedIn} from '../../main/config/auth/is-logged-in';

export const configureDeletePropertyRoute = (
    router: Router,
    path: string,
    deleteProperty: DeletePropertyFunction,
) => {
  router.delete(path, isLoggedIn, async (req, res, _next) => {
    const {propertyId} = req.params;
    // @ts-ignore
    const propertyContainer = await deleteProperty(req.user, propertyId);
    return res
        .status(propertyContainer.status)
        .json(propertyContainer.data);
  });
};
