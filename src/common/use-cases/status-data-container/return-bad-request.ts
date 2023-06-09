import {ReturnBadRequestFunction} from './types/return-bad-request';
import {HttpStatus} from '../../enums/HttpStatus';
import {errorMessageToDto} from '../errors';

export const makeReturnBadRequest = (): ReturnBadRequestFunction => {
  return function(errorMessage: string) {
    return {
      status: HttpStatus.BAD_REQUEST,
      data: errorMessageToDto(errorMessage),
    };
  };
};
