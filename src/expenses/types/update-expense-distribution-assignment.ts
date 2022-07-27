import {User} from '../../users/main/models/User';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
// eslint-disable-next-line max-len
import {ExpenseDistributionAssignmentDto} from '../dtos/ExpenseDistributionAssignmentDto';
import {ErrorDto} from '../../main/dtos/ErrorDto';

export type UpdateExpenseDistributionAssignmentFunction = (
    requestingUser: User,
    expenseDistributionAssignmentId: string,
    tenantEmail: string,
    amount: string,
) => Promise<StatusDataContainer<ExpenseDistributionAssignmentDto | ErrorDto>>;
