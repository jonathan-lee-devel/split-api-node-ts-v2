import {PropertyInvitationDto} from '../dtos/PropertyInvitationDto';
import {StatusDataContainer} from '../../../main/dtos/StatusDataContainer';

export type InviteToPropertyFunction = (
    propertyId: string,
    inviterEmail: string,
    inviteeEmail: string,
) => Promise<StatusDataContainer<PropertyInvitationDto>>;
