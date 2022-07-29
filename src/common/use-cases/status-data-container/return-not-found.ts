import {ReturnNotFoundFunction} from './types/return-not-found';

export const makeReturnNotFound = (): ReturnNotFoundFunction => {
  return function() {
    return {
      status: 404,
      data: undefined,
    };
  };
};
