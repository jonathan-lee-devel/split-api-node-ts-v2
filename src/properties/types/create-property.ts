import {PropertyDto} from '../dtos/PropertyDto';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {User} from '../../users/main/models/User';

export type CreatePropertyFunction = (
    requestingUser: User,
    title: string,
    tenantEmails: string[],
) => Promise<StatusDataContainer<PropertyDto>>;
