import {User} from '../../users/models/User';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {ExpenseDto} from '../dtos/ExpenseDto';

export type DeleteExpenseFunction = (
    requestingUser: User,
    expenseId: string,
) => Promise<StatusDataContainer<ExpenseDto>>;
