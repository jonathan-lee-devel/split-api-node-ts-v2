import mongoose from 'mongoose';

const {model, Schema} = mongoose;

export interface Notification {
    id: string;
    userEmail: string;
    title: string;
    text: string;
    isRead: boolean;
    datetime: Date;
    routerLink: string | undefined;
    buttonText: string | undefined;
}

const schema = new Schema<Notification>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  userEmail: {
    type: String,
    required: true,
    unique: false,
  },
  title: {
    type: String,
    required: true,
    unique: false,
  },
  text: {
    type: String,
    required: true,
    unique: false,
  },
  isRead: {
    type: Boolean,
    required: true,
    unique: false,
  },
  datetime: {
    type: Date,
    required: true,
    unique: false,
  },
  routerLink: {
    type: String,
    required: false,
    unique: false,
  },
  buttonText: {
    type: String,
    required: false,
    unique: false,
  },
});

export const NotificationModel = model<Notification>('Notification', schema);
