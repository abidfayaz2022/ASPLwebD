// pages/api/sendDoc.js

import nextConnect from 'next-connect';
import multer from 'multer';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// Disable default Next.js body parsing
export const config = {
  api: { bodyParser: false },
};

// Setup multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + file.originalname;
      cb(null, uniqueSuffix);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // Max 10MB
});

const handler = nextConnect();
handler.use(upload.single('file')); // 'file' is the field name in FormData

handler.post(async (req, res) => {
  const { name, email, message, subject } = req.body;
  const uploadedFile = req.file;

  // Send success response early
  res.status(200).json({ success: true });

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'info@theangelservices.com',
        pass: 'your-app-password', // 🔐 Use env vars in production!
      },
    });

    const html = `
      <h2>New Document Submission</h2>
      <p><strong>Name:</strong> ${name || 'N/A'}</p>
      <p><strong>Email:</strong> ${email || 'N/A'}</p>
      <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
      <p><strong>Message:</strong><br/>${message?.replace(/\n/g, '<br/>') || 'No message'}</p>
    `;

    // Send email to you (admin)
    await transporter.sendMail({
      from: `"Document Upload" <info@theangelservices.com>`,
      to: 'info@theangelservices.com',
      subject: subject || 'New Document Received',
      html,
      attachments: uploadedFile
        ? [
            {
              filename: uploadedFile.originalname,
              path: uploadedFile.path,
            },
          ]
        : [],
    });

    // Optional: send confirmation to user
    if (email) {
      await transporter.sendMail({
        from: `"Angel Services" <info@theangelservices.com>`,
        to: email,
        subject: 'Your Document Has Been Received',
        html: `
          <p>Dear ${name || 'User'},</p>
          <p>Thank you for your submission. We have received your document successfully.</p>
          <p>Regards,<br/>Angel Services Team</p>
        `,
      });
    }

    // Cleanup file
    if (uploadedFile?.path) fs.unlinkSync(uploadedFile.path);

  } catch (err) {
    console.error('Email or file handling error:', err);
  }
});

export default handler;
