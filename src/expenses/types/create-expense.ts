import {User} from '../../users/main/models/User';
import {ExpenseFrequency} from '../enums/ExpenseFrequency';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {ExpenseDto} from '../dtos/ExpenseDto';

export type CreateExpenseFunction = (
    requestingUser: User,
    propertyId: string,
    title: string,
    amount: number,
    frequency: ExpenseFrequency,
    date: Date,
) => Promise<StatusDataContainer<ExpenseDto>>;
