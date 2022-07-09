import {StatusDataContainer} from '../../../main/dtos/StatusDataContainer';
import {PropertyInvitationStatus} from '../enums/PropertyInvitationStatus';

export type ConfirmPropertyInvitationFunction = (
    tokenValue: string,
) => Promise<StatusDataContainer<PropertyInvitationStatus>>;
