import {PropertyInvitationToken} from '../models/PropertyInvitationToken';

export type GeneratePropertyInvitationTokenFunction = (
    propertyId: string,
    tokenSize: number,
    expiryTimeDays: number,
) => Promise<PropertyInvitationToken>;
