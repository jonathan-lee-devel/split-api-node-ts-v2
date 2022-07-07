import {Transporter} from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import {SendMailCallbackFunction} from '../types/inner/send-mail-callback';
import {SendMailFunction} from '../types/send-mail';

export const makeSendMail = (
    transporter: Transporter<SMTPTransport.SentMessageInfo>,
    sendMailCallback: SendMailCallbackFunction,
): SendMailFunction => {
  return async function sendMail(
      addressTo: string,
      subject: string,
      html: string,
  ): Promise<boolean> {
    await transporter.sendMail(
        {
          from: process.env.EMAIL_USER,
          to: addressTo,
          subject,
          html,
        },
        sendMailCallback,
    );

    return false;
  };
};
