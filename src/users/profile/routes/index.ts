import express from 'express';
import {configureGetProfileRoute} from './get-profile';
import {getProfile, updateProfile} from '../services';
import {configureUpdateProfileRoute} from './update-profile';

// eslint-disable-next-line new-cap
const router = express.Router();

configureGetProfileRoute(
    router,
    '/',
    getProfile,
);

configureUpdateProfileRoute(
    router,
    '/update',
    updateProfile,
);

export {router as ProfileRouter};
