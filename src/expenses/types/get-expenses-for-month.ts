import {User} from '../../users/main/models/User';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {ExpenseDto} from '../dtos/ExpenseDto';

export type GetExpensesForMonthFunction = (
    requestingUser: User,
    propertyId: string,
    month: number,
    year: number,
) => Promise<StatusDataContainer<ExpenseDto[]>>;
