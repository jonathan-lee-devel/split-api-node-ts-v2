import mongoose from 'mongoose';
import {ExpenseFrequency} from '../enums/ExpenseFrequency';

const {model, Schema} = mongoose;

export interface Expense {
    id: string;
    propertyId: string;
    title: string;
    amount: string;
    frequency: ExpenseFrequency;
    date: Date;
    createdByEmail: string;
}

const schema = new Schema<Expense>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  propertyId: {
    type: String,
    required: true,
    unique: false,
  },
  title: {
    type: String,
    required: true,
    unique: false,
  },
  amount: {
    type: String,
    required: true,
    unique: false,
  },
  frequency: {
    type: Number,
    required: true,
    unique: false,
  },
  date: {
    type: Date,
    required: true,
    unique: false,
  },
  createdByEmail: {
    type: String,
    required: true,
    unique: false,
  },
});

export const ExpenseModel = model<Expense>('Expense', schema);
