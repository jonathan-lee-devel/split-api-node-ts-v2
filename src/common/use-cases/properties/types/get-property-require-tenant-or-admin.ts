import {User} from '../../../../users/main/models/User';
import {Property} from '../../../../properties/models/Property';
import {StatusDataContainer} from '../../../../main/dtos/StatusDataContainer';

export type GetPropertyRequireTenantOrAdminFunction = (
    requestingUser: User,
    propertyId: string
) => Promise<StatusDataContainer<Property>>;
