import {Router} from 'express';
import {GetPropertyFunction} from '../types/get-property';

export const configureGetPropertyRoute = (
    router: Router,
    path: string,
    getProperty: GetPropertyFunction,
) => {
  router.get(path, async (req, res, _next) => {
    const property = await getProperty(req.params.propertyId);
    if (!property) {
      return res.status(404).send();
    }
    return res.status(200).json(property);
  });
};
