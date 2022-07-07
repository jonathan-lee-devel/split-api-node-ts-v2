import {SentMessageInfo} from 'nodemailer';
import {SendMailCallbackFunction} from '../../types/inner/send-mail-callback';

export const makeSendMailCallback = (): SendMailCallbackFunction => {
    return function sendMailCallback(
        err: Error | null,
        info: SentMessageInfo,
    ) {
        if (err) {
            console.error(err);
            return false;
        }
        console.log(`E-mail sent with response: ${info.response}`);
        return true;
    };
};
