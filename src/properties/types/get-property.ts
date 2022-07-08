import {StatusDataContainer} from '../../dtos/StatusDataContainer';
import {PropertyDto} from '../dtos/PropertyDto';
import {User} from '../../users/models/User';

export type GetPropertyFunction = (
    requestingUser: User,
    propertyId: string,
) => Promise<StatusDataContainer<PropertyDto>>;
