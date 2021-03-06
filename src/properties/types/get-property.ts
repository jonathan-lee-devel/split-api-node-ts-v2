import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {PropertyDto} from '../dtos/PropertyDto';
import {User} from '../../users/main/models/User';

export type GetPropertyFunction = (
    requestingUser: User,
    propertyId: string,
) => Promise<StatusDataContainer<PropertyDto>>;
