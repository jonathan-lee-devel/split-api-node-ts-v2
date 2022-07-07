import expressSession from 'express-session';

export const configureExpressSession = () => expressSession({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
});
