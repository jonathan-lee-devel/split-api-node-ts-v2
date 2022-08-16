import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {User} from '../../users/main/models/User';

export type GetPropertyTotalExpensesFunction = (
    requestingUser: User,
    propertyId: string,
    month: number,
    year: number,
) => Promise<StatusDataContainer<string>>;
