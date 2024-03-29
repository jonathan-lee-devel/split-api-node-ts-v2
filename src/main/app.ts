import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import {configureExpressSession} from './config/auth/configure-express-session';
import {configurePassport} from './config/auth/configure-passport';
import {configureCors} from './config/auth/configure-cors';
import {connectToDatabase} from './config/database/connect-to-database';
import {UserModel} from '../users/main/models/User';
import {PropertiesRouter} from '../properties/routes';
import {PropertyInvitationsRouter} from '../properties/invitations/routes';
import {ExpensesRouter} from '../expenses/routes';
import {RegistrationRouter} from '../users/registration/routes';
import {UsersRouter} from '../users/main/routes';
import {PasswordResetRouter} from '../users/password/routes';
import {loggerConfig} from './config/logger/logger-config';
import {ProfileRouter} from '../users/profile/routes';
import {NotificationsRouter} from '../notifications/routes';
import {HttpStatus} from '../common/enums/HttpStatus';

const logger = loggerConfig();

const app = express();
app.use(helmet.hidePoweredBy());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(configureExpressSession(logger));

const passport = configurePassport(logger, UserModel);
app.use(passport.initialize());
app.use(passport.session());

app.use(configureCors(logger));

connectToDatabase(logger);

app.use('/users', UsersRouter);
app.use('/users/register', RegistrationRouter);
app.use('/users/password', PasswordResetRouter);
app.use('/users/profile', ProfileRouter);
app.use('/properties', PropertiesRouter);
app.use('/invitations', PropertyInvitationsRouter);
app.use('/expenses', ExpensesRouter);
app.use('/notifications', NotificationsRouter);

app.use((_req, _res, next) => {
  next(createError(HttpStatus.NOT_FOUND));
});

app.use(
    (
        err: { message: string; status: string },
        req: any,
        res: {
            locals: { message: any; error: any };
            status: (arg0: any) => void;
            json: (arg0: { error: any }) => void;
        },
        _: any,
    ) => {
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      logger.error(
          `Error at ${req.url}: {"status":"${err.status}", "message":"${err.message}"}`,
      );
      res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR);
      res.json((process.env.NODE_ENV === 'development') ? {error: err.message} : undefined);
    },
);

export {app};
