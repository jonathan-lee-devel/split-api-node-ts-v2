import {ExpenseFrequency} from '../enums/ExpenseFrequency';

export interface ExpenseDto {
    id: string;
    propertyId: string;
    title: string;
    amount: string;
    frequency: ExpenseFrequency;
    startDate: Date;
    endDate: Date;
    createdByEmail: string;
}
