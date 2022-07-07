import mongoose from 'mongoose';
import {ObjectID} from 'bson';

const {model, Schema} = mongoose;

export interface Property {
    id: string;
    title: string;
    tenantEmails: string[];
    createdBy: string;
    admin: Property;
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
  createdBy: {
    type: String,
    required: true,
    unique: false,
  },
  admin: {
    type: ObjectID,
    required: true,
    unique: false,
  },
});

export const PropertyModel = model<Property>('Property', schema);
