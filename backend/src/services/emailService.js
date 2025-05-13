import nodemailer from 'nodemailer';

export const sendReminderEmail = async (to, subject, message,invoicePath) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text: message,
    attachments: [
      {
        filename: 'invoice.pdf',
        path: invoicePath,
      },
    ],
  });
};
