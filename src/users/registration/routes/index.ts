import express from 'express';
import {configureRegisterUserRoute} from './register-user';
import {registerUser} from '../services';

// eslint-disable-next-line new-cap
const router = express.Router();

configureRegisterUserRoute(router, '/', registerUser);

export {router as RegistrationRouter};
