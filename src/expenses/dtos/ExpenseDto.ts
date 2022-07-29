import {ExpenseFrequency} from '../enums/ExpenseFrequency';

export interface ExpenseDto {
    id: string;
    propertyId: string;
    title: string;
    amount: string;
    frequency: ExpenseFrequency;
    date: Date;
    createdByEmail: string;
}
