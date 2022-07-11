import {StatusDataContainer} from '../../../main/dtos/StatusDataContainer';
// eslint-disable-next-line max-len
import {PasswordResetVerificationToken} from '../models/PasswordResetVerificationToken';

export type GeneratePasswordResetVerificationTokenFunction = (
    tokenSize: number,
    expiryTimeMinutes: number,
    userEmail: string,
) => Promise<StatusDataContainer<PasswordResetVerificationToken>>;
