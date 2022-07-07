import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import {connectToDatabase} from './config/database/connect-to-database';

const app = express();
app.use(helmet.hidePoweredBy());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

connectToDatabase();

app.use((_req, _res, next) => {
  next(createError(404));
});

export {app};
