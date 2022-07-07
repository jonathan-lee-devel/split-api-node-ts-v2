import {Router} from 'express';
import {GetPropertyFunction} from '../types/get-property';

export const configureGetPropertyRoute = (
    router: Router,
    path: string,
    getProperty: GetPropertyFunction,
) => {
  router.get(path, async (req, res, _next) => {
    const propertyContainer = await getProperty(req.params.propertyId);
    return res
        .status(propertyContainer.status)
        .json(propertyContainer.data);
  });
};
