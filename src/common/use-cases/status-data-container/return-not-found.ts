import {ReturnNotFoundFunction} from './types/return-not-found';
import {HttpStatus} from '../../enums/HttpStatus';

export const makeReturnNotFound = (): ReturnNotFoundFunction => {
  return function() {
    return {
      status: HttpStatus.NOT_FOUND,
      data: undefined,
    };
  };
};
