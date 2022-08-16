import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {User} from '../../users/main/models/User';
import {ExpenseBreakdownDto} from '../../expenses/dtos/ExpenseBreakdownDto';
import {ErrorDto} from '../../main/dtos/ErrorDto';

export type GetPropertyTotalExpensesPerTenantFunction = (
    requestingUser: User,
    propertyId: string,
    month: number,
    year: number,
) => Promise<StatusDataContainer<ExpenseBreakdownDto | ErrorDto>>;
