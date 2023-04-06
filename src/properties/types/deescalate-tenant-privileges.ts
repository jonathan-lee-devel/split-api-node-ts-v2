import {User} from '../../users/main/models/User';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {PropertyInvitationStatusDto} from '../invitations/dtos/PropertyInvitationStatusDto';
import {ErrorDto} from '../../main/dtos/ErrorDto';

export type DeescalateTenantPrivilegesFunction = (
    requestingUser: User,
    propertyId: string,
    tenantEmailToDeescalate: string,
) => Promise<StatusDataContainer<PropertyInvitationStatusDto | ErrorDto>>;
