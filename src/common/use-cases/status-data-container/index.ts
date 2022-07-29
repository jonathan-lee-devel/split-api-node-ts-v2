import {makeReturnNotFound} from './return-not-found';
import {makeReturnForbidden} from './return-forbidden';
import {makeReturnInternalServerError} from './return-internal-server-error';

export const returnNotFound = makeReturnNotFound();

export const returnForbidden = makeReturnForbidden();

export const returnInternalServerError =
    makeReturnInternalServerError();
