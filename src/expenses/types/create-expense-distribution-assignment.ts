import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {ExpenseDistributionAssignmentDto} from '../dtos/ExpenseDistributionAssignmentDto';
import {User} from '../../users/main/models/User';
import {ErrorDto} from '../../main/dtos/ErrorDto';

export type CreateExpenseDistributionAssignmentFunction = (
    requestingUser: User,
    expenseId: string,
    tenantEmail: string,
    amount: string,
) => Promise<StatusDataContainer<ExpenseDistributionAssignmentDto | ErrorDto>>;
