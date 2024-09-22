import nodemailer from 'nodemailer';
import { getFromEnv } from '../getFromEnv.js';
import { emailHtml } from './emailHtml.js';
import { logErrInfoMsg, logSuccessMsg } from '../console/log.js';
export const sendEmail = async ({ userEmail, token, subject }) => {
    const { user, email, pass, emailService } = getFromEnv();
    const transporter = nodemailer.createTransport({
        service: emailService,
        auth: {
            user: email,
            pass,
        },
    });
    let mailMessage = 'Message Not Sended Successfully';
    await new Promise((resolve, reject) => {
        transporter.sendMail({
            from: `"${user}" <${email}>`,
            to: userEmail,
            subject,
            html: emailHtml({ token }),
        }, (err, info) => {
            if (err) {
                logErrInfoMsg(err);
                reject({
                    mailMessage,
                    err,
                });
            }
            else {
                mailMessage = 'Message Sended Successfully ' + info.accepted;
                logSuccessMsg(mailMessage);
                resolve(mailMessage);
            }
        });
    });
    return mailMessage;
};
