import {StatusDataContainer} from '../../../main/dtos/StatusDataContainer';
import {PropertyInvitationStatusDto} from '../dtos/PropertyInvitationStatusDto';

export type ConfirmPropertyInvitationFunction = (
    tokenValue: string,
) => Promise<StatusDataContainer<PropertyInvitationStatusDto>>;
