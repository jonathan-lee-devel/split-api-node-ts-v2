import {User} from '../../users/main/models/User';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {ExpenseDto} from '../dtos/ExpenseDto';

export type GetExpensesForPropertyFunction = (
    requestingUser: User,
    propertyId: string,
) => Promise<StatusDataContainer<ExpenseDto[]>>;
