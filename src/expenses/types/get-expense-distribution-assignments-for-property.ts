import {User} from '../../users/main/models/User';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
// eslint-disable-next-line max-len
import {ExpenseDistributionAssignmentDto} from '../dtos/ExpenseDistributionAssignmentDto';

export type GetExpenseDistributionAssignmentsForPropertyFunction = (
    requestingUser: User,
    propertyId: string,
) => Promise<StatusDataContainer<ExpenseDistributionAssignmentDto[]>>;
