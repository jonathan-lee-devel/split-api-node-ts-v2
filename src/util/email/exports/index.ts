import {makeSendMailCallback} from './inner/send-mail-callback';
import {transporterConfig} from '../config/Email';
import {makeSendMail} from './send-mail';
import {makeVerifyEmail} from './verify-email';

export const sendMail = makeSendMail(
    transporterConfig(),
    makeSendMailCallback(),
);

export const verifyEmail = makeVerifyEmail();
