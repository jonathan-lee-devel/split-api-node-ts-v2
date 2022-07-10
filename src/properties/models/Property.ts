import mongoose from 'mongoose';

const {model, Schema} = mongoose;

export interface Property {
    id: string;
    title: string;
    tenantEmails: string[];
    acceptedTenantEmails: string[];
    createdByEmail: string;
    administratorEmails: string[];
}

const schema = new Schema<Property>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    unique: false,
  },
  tenantEmails: {
    type: [String],
    required: true,
    unique: false,
  },
  acceptedTenantEmails: {
    type: [String],
    required: true,
    unique: false,
  },
  createdByEmail: {
    type: String,
    required: true,
    unique: false,
  },
  administratorEmails: {
    type: [String],
    required: true,
    unique: false,
  },
});

export const PropertyModel = model<Property>('Property', schema);
