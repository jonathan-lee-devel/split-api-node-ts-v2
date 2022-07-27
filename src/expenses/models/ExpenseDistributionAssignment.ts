import mongoose from 'mongoose';

const {model, Schema} = mongoose;

export interface ExpenseDistributionAssignment {
    id: string;
    expenseId: string;
    tenantEmail: string;
    amount: string;
}

const schema = new Schema<ExpenseDistributionAssignment>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  expenseId: {
    type: String,
    required: true,
    unique: false,
  },
  tenantEmail: {
    type: String,
    required: true,
    unique: false,
  },
  amount: {
    type: String,
    required: true,
    unique: false,
  },
});

export const ExpenseDistributionAssignmentModel =
    model<ExpenseDistributionAssignment>(
        'ExpenseDistributionAssignment', schema,
    );
