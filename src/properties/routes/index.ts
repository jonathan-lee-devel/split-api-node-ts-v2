import express from 'express';
import {configureGetPropertyRoute} from './get-property';
import {getProperty} from '../services';

// eslint-disable-next-line new-cap
const router = express.Router();

configureGetPropertyRoute(router, '/:propertyId', getProperty);

export {router as PropertiesRouter};
