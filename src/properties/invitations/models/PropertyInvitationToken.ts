import mongoose from 'mongoose';

const {model, Schema} = mongoose;

export interface PropertyInvitationToken {
    propertyId: string;
    expiryDate: Date;
    value: string;
}

const schema = new Schema<PropertyInvitationToken>({
  propertyId: {
    type: String,
    required: true,
    unique: false,
  },
  expiryDate: {
    type: Date,
    required: true,
    unique: false,
  },
  value: {
    type: String,
    required: true,
    unique: true,
  },
});

export const PropertyInvitationTokenModel =
    model<PropertyInvitationToken>('PropertyInvitationToken', schema);
