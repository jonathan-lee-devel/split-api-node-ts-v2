import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {ExpenseDistributionAssignmentDto} from '../dtos/ExpenseDistributionAssignmentDto';
import {User} from '../../users/main/models/User';
import {ErrorDto} from '../../main/dtos/ErrorDto';

export type DeleteExpenseDistributionAssignmentFunction = (
    requestingUser: User,
    expenseDistributionAssignmentId: string,
) => Promise<StatusDataContainer<ExpenseDistributionAssignmentDto | ErrorDto>>;
