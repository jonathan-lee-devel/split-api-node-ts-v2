import {makeReturnNotFound} from './return-not-found';
import {makeReturnForbidden} from './return-forbidden';
import {makeReturnInternalServerError} from './return-internal-server-error';
import {makeReturnBadRequest} from './return-bad-request';

export const returnNotFound = makeReturnNotFound();

export const returnForbidden = makeReturnForbidden();

export const returnInternalServerError = makeReturnInternalServerError();

export const returnBadRequest = makeReturnBadRequest();
