import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';

const app = express();
app.use(helmet.hidePoweredBy());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
    next(createError(404));
});

export {app};
