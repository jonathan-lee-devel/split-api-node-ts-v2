import {SendMailFunction} from '../../../util/email/types/send-mail';
// eslint-disable-next-line max-len
import {SendPropertyInvitationFunction} from '../types/send-property-invitation';

export const makeSendPropertyInvitation = (
    sendMail: SendMailFunction,
): SendPropertyInvitationFunction => {
  return async function sendPropertyInvitation(
      propertyInvitationTokenValue: string,
      inviterEmail: string,
      inviteeEmail: string): Promise<void> {
    // no await as sending mail is slow, can be sent asynchronously
    sendMail(
        inviteeEmail,
        'Split Property Invitation',
        // eslint-disable-next-line max-len
        `<h2>${inviterEmail} has invited you to manage a shared living space</h2>
<h3>Please click the following link to accept:
<a href="${process.env.FRONT_END_URL}/property/invitation/verify/${propertyInvitationTokenValue}">Accept</a></h3>`,
    );
  };
};
