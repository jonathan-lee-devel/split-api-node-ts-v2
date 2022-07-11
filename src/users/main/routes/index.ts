import express from 'express';
import {configureLoginRoute} from './login-route';
import {configureLogoutRoute} from './logout-route';

// eslint-disable-next-line new-cap
const router = express.Router();

configureLoginRoute(router, '/login');

configureLogoutRoute(router, '/logout');

export {router as UsersRouter};
