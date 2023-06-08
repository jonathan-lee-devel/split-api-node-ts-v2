import {ReturnInternalServerErrorFunction} from './types/return-internal-server-error';
import {HttpStatus} from '../../enums/HttpStatus';

export const makeReturnInternalServerError = ()
    : ReturnInternalServerErrorFunction => {
  return function() {
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      data: undefined,
    };
  };
};
