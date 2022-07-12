import {makeGetProperty} from './get-property';
import {PropertyModel} from '../models/Property';
import {makeCreateProperty} from './create-property';
import {generatedId} from '../../util/id/services';
import {inviteToProperty} from '../invitations/services';
import {loggerConfig} from '../../main/config/logger/logger-config';

const logger = loggerConfig();

export const getProperty = makeGetProperty(logger, PropertyModel);

export const createProperty = makeCreateProperty(
    logger,
    generatedId,
    PropertyModel,
    inviteToProperty,
);
