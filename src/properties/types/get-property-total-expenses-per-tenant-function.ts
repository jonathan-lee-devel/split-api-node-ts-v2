import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {User} from '../../users/main/models/User';

export type GetPropertyTotalExpensesPerTenantFunction = (
    requestingUser: User,
    propertyId: string,
) => Promise<StatusDataContainer<string>>;
