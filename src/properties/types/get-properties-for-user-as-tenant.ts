import {User} from '../../users/main/models/User';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {PropertyDto} from '../dtos/PropertyDto';

export type GetPropertiesForUserAsTenantFunction = (
    requestingUser: User,
) => Promise<StatusDataContainer<PropertyDto[]>>;
