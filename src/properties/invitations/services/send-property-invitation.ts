import {SendMailFunction} from '../../../util/email/types/send-mail';
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
        `<p>${inviterEmail} has invited you to manage a shared living space</p>
<h3>Please click the following link to accept:
<a href="${process.env.FRONT_END_URL}/property/invitation/verify/${propertyInvitationTokenValue}">Accept</a></h3>`,
    );
  };
};
