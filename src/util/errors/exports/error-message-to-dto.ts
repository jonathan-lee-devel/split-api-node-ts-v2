import {ErrorMessageToDtoFunction} from '../types/error-message-to-dto';

export const makeErrorMessageToDto = (): ErrorMessageToDtoFunction => {
  return function(errorMessage: string) {
    return {
      errors: [
        {
          'msg': errorMessage,
        },
      ],
    };
  };
};
