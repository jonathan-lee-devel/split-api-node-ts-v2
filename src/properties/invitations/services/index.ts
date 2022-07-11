import {makeInviteToProperty} from './invite-to-property';
import {PropertyModel} from '../../models/Property';
import {makeCreatePropertyInvitation} from './create-property-invitation';
import {generatedId} from '../../../util/id/services';
// eslint-disable-next-line max-len
import {makeGeneratePropertyInvitationToken} from './generate-property-invitation-token';
import {PropertyInvitationTokenModel} from '../models/PropertyInvitationToken';
import {PropertyInvitationModel} from '../models/PropertyInvitation';
import {makeSendPropertyInvitation} from './send-property-invitation';
import {sendMail} from '../../../util/email/exports';
import {makeConfirmPropertyInvitation} from './confirm-property-invitation';

const generatePropertyInvitationToken = makeGeneratePropertyInvitationToken();

const createPropertyInvitation = makeCreatePropertyInvitation(
    generatedId,
    generatePropertyInvitationToken,
    PropertyInvitationTokenModel,
    PropertyInvitationModel,
);

const sendPropertyInvitation = makeSendPropertyInvitation(
    sendMail,
);

export const inviteToProperty = makeInviteToProperty(
    PropertyModel,
    createPropertyInvitation,
    sendPropertyInvitation,
);

export const confirmPropertyInvitation = makeConfirmPropertyInvitation(
    PropertyInvitationTokenModel,
    PropertyInvitationModel,
    PropertyModel,
);
