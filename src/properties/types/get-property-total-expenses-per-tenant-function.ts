import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {User} from '../../users/main/models/User';
import {ExpenseBreakdownDto} from '../../expenses/dtos/ExpenseBreakdownDto';

export type GetPropertyTotalExpensesPerTenantFunction = (
    requestingUser: User,
    propertyId: string,
) => Promise<StatusDataContainer<ExpenseBreakdownDto>>;
