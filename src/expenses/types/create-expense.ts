import {Dinero} from 'dinero.js';
import {User} from '../../users/main/models/User';
import {ExpenseFrequency} from '../enums/ExpenseFrequency';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {ExpenseDto} from '../dtos/ExpenseDto';

export type CreateExpenseFunction = (
    requestingUser: User,
    propertyId: string,
    title: string,
    amount: Dinero,
    frequency: ExpenseFrequency,
    startDate: Date,
    endDate: Date,
) => Promise<StatusDataContainer<ExpenseDto>>;
