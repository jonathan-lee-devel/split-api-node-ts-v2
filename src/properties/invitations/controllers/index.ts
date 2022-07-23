// eslint-disable-next-line max-len
import {makeConfirmPropertyInvitationController} from './confirm-property-invitation';
import {confirmPropertyInvitation} from '../services';

export const confirmPropertyInvitationController =
    makeConfirmPropertyInvitationController(confirmPropertyInvitation);
