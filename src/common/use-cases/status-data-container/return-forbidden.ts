import {ReturnForbiddenFunction} from './types/return-forbidden';

export const makeReturnForbidden = (): ReturnForbiddenFunction => {
  return function() {
    return {
      status: 403,
      data: undefined,
    };
  };
};
