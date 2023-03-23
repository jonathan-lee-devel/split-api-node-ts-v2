import {body, ValidationChain} from 'express-validator';
import {DEFAULT_TOKEN_SIZE} from '../../../util/token/default-token-size';

export const confirmPropertyInvitationValidationChain: ValidationChain[] = [
  body('tokenValue', 'Must be a valid token value')
      .exists()
      .isLength({min: DEFAULT_TOKEN_SIZE, max: DEFAULT_TOKEN_SIZE}),
];
