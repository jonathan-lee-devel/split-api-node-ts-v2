import {PropertyInvitationTokenDto} from './PropertyInvitationTokenDto';

export interface PropertyInvitationDto {
    id: string;
    propertyId: string;
    inviterEmail: string;
    inviteeEmail: string;
    accepted: boolean;
    propertyInvitationToken: PropertyInvitationTokenDto;
}
