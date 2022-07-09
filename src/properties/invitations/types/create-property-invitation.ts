import {StatusDataContainer} from '../../../main/dtos/StatusDataContainer';
import {PropertyInvitationDto} from '../dtos/PropertyInvitationDto';

export type CreatePropertyInvitationFunction = (
    propertyId: string,
    inviterEmail: string,
    inviteeEmail: string,
) => Promise<StatusDataContainer<PropertyInvitationDto>>;
