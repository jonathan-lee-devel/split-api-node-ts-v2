import {Router} from 'express';
import {CreatePropertyFunction} from '../types/create-property';
import {isLoggedIn} from '../../main/config/auth/is-logged-in';

export const configurePostPropertyRoute = (
    router: Router,
    path: string,
    createProperty: CreatePropertyFunction,
) => {
  router.post(path, isLoggedIn, async (req, res, _next) => {
    const {title, tenantEmails, administratorEmails} = req.body;
    const propertyContainer = await createProperty(
        // @ts-ignore
        req.user,
        title,
        tenantEmails,
        administratorEmails,
    );
    return res
        .status(propertyContainer.status)
        .json(propertyContainer.data);
  });
};
