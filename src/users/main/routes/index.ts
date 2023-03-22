import express from 'express';
import {configureLoginRoute} from './login-route';
import {configureLogoutRoute} from './logout-route';

const router = express.Router();

configureLoginRoute(router, '/login');

configureLogoutRoute(router, '/logout');

export {router as UsersRouter};
