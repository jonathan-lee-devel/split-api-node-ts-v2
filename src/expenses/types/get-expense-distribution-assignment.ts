import {User} from '../../users/main/models/User';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
// eslint-disable-next-line max-len
import {ExpenseDistributionAssignmentDto} from '../dtos/ExpenseDistributionAssignmentDto';

export type GetExpenseDistributionAssignmentFunction = (
    requestingUser: User,
    propertyId: string,
    expenseDistributionAssignmentId: string,
) => Promise<StatusDataContainer<ExpenseDistributionAssignmentDto>>;
