import {User} from '../../users/main/models/User';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {PropertyDto} from '../dtos/PropertyDto';

export type DeletePropertyFunction = (
    requestingUser: User,
    propertyId: string,
) => Promise<StatusDataContainer<PropertyDto>>;
