import express from 'express';
import {configureLoginRoute} from './login-route';

// eslint-disable-next-line new-cap
const router = express.Router();

configureLoginRoute(router, '/login');

export {router as UsersRouter};
