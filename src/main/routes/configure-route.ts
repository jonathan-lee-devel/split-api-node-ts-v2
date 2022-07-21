import {Router} from 'express';
import {ValidationChain} from 'express-validator';
import {RequestCallback} from '../types/request-callback';
import {isLoggedIn} from '../config/auth/is-logged-in';
import {HttpRequestMethod} from '../enums/http-request-method';

export const configureRoute = (
    router: Router,
    method: HttpRequestMethod,
    path: string,
    isLoginRequired: boolean,
    requestValidationChain: ValidationChain[],
    requestCallback: RequestCallback,
) => {
  if (isLoginRequired) {
    router[method](path, isLoggedIn, requestValidationChain, requestCallback);
  }
  router[method](path, requestValidationChain, requestCallback);
};
