import {makeGetProperty} from './get-property';
import {PropertyModel} from '../models/Property';
import {makeCreateProperty} from './create-property';
import {generatedId} from '../../util/id/exports';
import {inviteToProperty} from '../invitations/services';

export const getProperty = makeGetProperty(PropertyModel);

export const createProperty = makeCreateProperty(
    generatedId,
    PropertyModel,
    inviteToProperty,
);
