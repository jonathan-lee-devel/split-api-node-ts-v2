import {IndividualExpenseBreakdownDto} from './IndividualExpenseBreakdownDto';

export interface ExpenseBreakdownDto {
    total: string;
    expenses: IndividualExpenseBreakdownDto[];
}
