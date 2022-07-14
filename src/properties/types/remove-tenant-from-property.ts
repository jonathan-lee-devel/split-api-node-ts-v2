import {User} from '../../users/main/models/User';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {PropertyDto} from '../dtos/PropertyDto';

export type RemoveTenantFromPropertyFunction = (
    requestingUser: User,
    propertyId: string,
    tenantEmailToRemove: string,
) => Promise<StatusDataContainer<PropertyDto>>;
