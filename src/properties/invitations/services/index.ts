import {makeInviteToProperty} from './invite-to-property';
import {PropertyModel} from '../../models/Property';
import {makeCreatePropertyInvitation} from './create-property-invitation';
import {generatedId} from '../../../util/id/services';
import {makeGeneratePropertyInvitationToken} from './generate-property-invitation-token';
import {PropertyInvitationTokenModel} from '../models/PropertyInvitationToken';
import {PropertyInvitationModel} from '../models/PropertyInvitation';
import {makeSendPropertyInvitation} from './send-property-invitation';
import {sendMail} from '../../../util/email/exports';
import {makeConfirmPropertyInvitation} from './confirm-property-invitation';
import {loggerConfig} from '../../../main/config/logger/logger-config';

const logger = loggerConfig();

const generatePropertyInvitationToken = makeGeneratePropertyInvitationToken();

const createPropertyInvitation = makeCreatePropertyInvitation(
    logger,
    generatedId,
    generatePropertyInvitationToken,
    PropertyInvitationTokenModel,
    PropertyInvitationModel,
);

const sendPropertyInvitation = makeSendPropertyInvitation(
    logger,
    sendMail,
);

export const inviteToProperty = makeInviteToProperty(
    logger,
    PropertyModel,
    createPropertyInvitation,
    sendPropertyInvitation,
);

export const confirmPropertyInvitation = makeConfirmPropertyInvitation(
    logger,
    PropertyInvitationTokenModel,
    PropertyInvitationModel,
    PropertyModel,
);
