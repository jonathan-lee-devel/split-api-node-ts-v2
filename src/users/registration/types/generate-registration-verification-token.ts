import {StatusDataContainer} from '../../../main/dtos/StatusDataContainer';
import {RegistrationVerificationToken} from '../models/RegistrationVerificationToken';

export type GenerateRegistrationVerificationTokenFunction = (
    tokenSize: number,
    expiryTimeMinutes: number,
    userEmail: string,
) => Promise<StatusDataContainer<RegistrationVerificationToken>>;
