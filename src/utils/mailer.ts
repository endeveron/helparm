import nodemailer from 'nodemailer';

interface ISendEmailArgs {
  from: string;
  to: string;
  subject: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// See: https://nodemailer.com/message/
export const sendEmail = async (data: ISendEmailArgs) => {
  let info = await transporter.sendMail(data);
  return !!info?.messageId;
};
