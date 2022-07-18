import {makeCreatePropertyController} from './create-property';
import {createProperty} from '../services';

export const createPropertyController =
    makeCreatePropertyController(createProperty);
