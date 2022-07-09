import mongoose from 'mongoose';
import {ObjectID} from 'bson';
import {PropertyInvitationToken} from './PropertyInvitationToken';

const {model, Schema} = mongoose;

export interface PropertyInvitation {
    id: string;
    propertyId: string;
    inviterEmail: string;
    inviteeEmail: string;
    accepted: boolean;
    propertyInvitationToken: PropertyInvitationToken;
}

const schema = new Schema<PropertyInvitation>({
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
  inviteeEmail: {
    type: String,
    required: true,
    unique: false,
  },
  inviterEmail: {
    type: String,
    required: true,
    unique: false,
  },
  accepted: {
    type: Boolean,
    required: true,
    unique: false,
  },
  propertyInvitationToken: {
    type: ObjectID,
    required: true,
    unique: true,
  },
});

export const PropertyInvitationModel =
    model<PropertyInvitation>('PropertyInvitation', schema);
