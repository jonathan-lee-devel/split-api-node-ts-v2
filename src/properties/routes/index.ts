import express from 'express';
import {configureGetPropertyRoute} from './get-property';
import {configurePostPropertyRoute} from './create-property';
import {createProperty, getProperty} from '../services';

// eslint-disable-next-line new-cap
const router = express.Router();

configureGetPropertyRoute(router, '/:propertyId', getProperty);
configurePostPropertyRoute(router, '/', createProperty);

export {router as PropertiesRouter};
