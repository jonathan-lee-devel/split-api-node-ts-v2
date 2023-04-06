import {User} from '../../users/main/models/User';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {PropertyInvitationStatusDto} from '../invitations/dtos/PropertyInvitationStatusDto';
import {ErrorDto} from '../../main/dtos/ErrorDto';

export type EscalateTenantPrivilegesFunction = (
    requestingUser: User,
    propertyId: string,
    tenantEmailToEscalate: string,
) => Promise<StatusDataContainer<PropertyInvitationStatusDto | ErrorDto>>;
