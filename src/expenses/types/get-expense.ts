import {User} from '../../users/main/models/User';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {ExpenseDto} from '../dtos/ExpenseDto';

export type GetExpenseFunction = (
    requestingUser: User,
    expenseId: string,
) => Promise<StatusDataContainer<ExpenseDto>>;
