import {User} from '../../../../users/main/models/User';
import {Expense} from '../../../../expenses/models/Expense';

export type GetAggregatedExpensesForMonthFunction = (
    requestingUser: User,
    propertyId: string,
    month: number,
    year: number,
) => Promise<Expense[]>;
