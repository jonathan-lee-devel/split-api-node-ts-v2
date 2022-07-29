// eslint-disable-next-line max-len
import {ReturnInternalServerErrorFunction} from './types/return-internal-server-error';

export const makeReturnInternalServerError = ()
    : ReturnInternalServerErrorFunction => {
  return function() {
    return {
      status: 500,
      data: undefined,
    };
  };
};
