import {ReturnForbiddenFunction} from './types/return-forbidden';
import {HttpStatus} from '../../enums/HttpStatus';

export const makeReturnForbidden = (): ReturnForbiddenFunction => {
  return function() {
    return {
      status: HttpStatus.FORBIDDEN,
      data: undefined,
    };
  };
};
