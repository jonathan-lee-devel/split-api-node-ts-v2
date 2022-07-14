import {User} from '../../users/main/models/User';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {PropertyDto} from '../dtos/PropertyDto';

export type GetPropertiesForUserAsAdminFunction = (
    requestingUser: User,
) => Promise<StatusDataContainer<PropertyDto[]>>;
