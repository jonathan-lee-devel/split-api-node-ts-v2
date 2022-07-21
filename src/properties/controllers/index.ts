import {makeCreatePropertyController} from './create-property';
import {createProperty, deleteProperty} from '../services';
import {makeDeletePropertyController} from './delete-property';

export const createPropertyController =
    makeCreatePropertyController(createProperty);

export const deletePropertyController =
    makeDeletePropertyController(deleteProperty);
