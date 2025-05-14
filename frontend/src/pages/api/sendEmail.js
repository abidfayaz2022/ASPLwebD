import nodemailer from 'nodemailer';
import AWS from 'aws-sdk';
import path from 'path';

const s3 = new AWS.S3({
  accessKeyId: 'AKIAQRMGVE3O3DDDQBPB', // replace or move to env in production
  secretAccessKey: 'q3A+tVk2RpFAMflViBz6F4fmLTRfE3z9a4hTD4+B',
  region: 'ap-southeast-1',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const formData = req.body;
  const userEmail = formData.email;

  if (!formData || typeof formData !== 'object') {
    return res.status(400).json({ success: false, message: 'Invalid form data' });
  }

  // Respond to frontend immediately
  res.status(200).json({ success: true });

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "info@theangelservices.com",
        pass: "klxl xwxi vuqt gprn" // replace with env in prod
      }
    });

    const isContactForm = formData?.message !== undefined && !formData?.jobTitle;
    const isJobApplication = formData?.resumeUrl !== undefined;

    const formattedUserData = isContactForm
      ? formatContactSubmission(formData)
      : isJobApplication
      ? formatJobApplicationSubmission(formData)
      : formatIncorporationSubmission(formData);

    // Resume attachment if job application
    let attachment = null;
    if (isJobApplication && formData.resumeUrl) {
      try {
        attachment = await fetchFileFromS3(formData.resumeUrl);
      } catch (err) {
        console.error("Failed to fetch resume from S3:", err);
      }
    }

    const emailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: auto; border: 1px solid #ddd; padding: 30px; border-radius: 10px;">
        ${formattedUserData}
      </div>
    `;

    const adminMailOptions = {
      from: '"Angel Services" <info@theangelservices.com>',
      to: "info@theangelservices.com",
      subject: isContactForm
        ? "New Contact Form Submission - Angel Services"
        : isJobApplication
        ? `New Job Application - ${formData.jobTitle || 'Unknown Position'}`
        : "New Incorporation Submission - Angel Services",
      html: emailBody,
      attachments: attachment ? [attachment] : []
    };

    const userMailOptions = {
      from: '"Angel Services" <info@theangelservices.com>',
      to: userEmail,
      subject: "Confirmation - Your Submission Received",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: auto; border: 1px solid #ddd; padding: 30px; border-radius: 10px;">
          <img src="https://asplconsultancy.com/static/images/angelserviceslogo%20(2).png" alt="Angel Services Logo" style="max-width: 180px; margin-bottom: 20px;" />
          <h2>Thank you for your submission!</h2>
          <p>We have received your information and will be in touch soon.</p>
          ${formattedUserData}
          <p style="margin-top: 20px;">Best Regards,<br/><strong>Angel Services Team</strong></p>
        </div>
      `
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

  } catch (error) {
    console.error("Email Sending Error:", error);
  }
}

// Helper: Fetch file from S3 and return attachment object
const fetchFileFromS3 = async (fileUrl) => {
  const url = new URL(fileUrl);
  const bucket = url.hostname.split('.')[0]; // 'angel-frontend'
  const key = decodeURIComponent(url.pathname.slice(1)); // remove leading '/'

  const s3Params = {
    Bucket: bucket,
    Key: key,
  };

  const s3Object = await s3.getObject(s3Params).promise();

  return {
    filename: path.basename(key),
    content: s3Object.Body,
    contentType: s3Object.ContentType,
  };
};

// Contact form formatting
const formatContactSubmission = (data) => {
  return `
    <h2 style="color: #333;">New Contact Form Submission</h2>
    <table style="border-collapse: collapse; width: 100%; border: 1px solid #ccc;">
      <tr><td style="padding: 10px; border: 1px solid #ccc;"><strong>Name:</strong></td><td>${data.name || "N/A"}</td></tr>
      <tr><td style="padding: 10px; border: 1px solid #ccc;"><strong>Email:</strong></td><td>${data.email || "N/A"}</td></tr>
      <tr><td style="padding: 10px; border: 1px solid #ccc;"><strong>Company:</strong></td><td>${data.company || "Not Provided"}</td></tr>
      <tr><td style="padding: 10px; border: 1px solid #ccc;"><strong>Phone:</strong></td><td>${data.phone || "Not Provided"}</td></tr>
      <tr><td style="padding: 10px; border: 1px solid #ccc;"><strong>Message:</strong></td><td>${data.message || "No Message Provided"}</td></tr>
    </table>
  `;
};

// Incorporation formatting
const formatIncorporationSubmission = (data) => {
  const renderNested = (obj, depth = 0) => {
    return Object.entries(obj)
      .map(([key, value], i) => {
        const bg = i % 2 === 0 ? "#f9f9f9" : "#ffffff";

        if (typeof value === "object" && value !== null) {
          return `
            <tr style="background-color: ${bg};">
              <td style="padding: 10px; border: 1px solid #ccc; font-weight: bold;">${key}</td>
              <td style="padding: 10px; border: 1px solid #ccc;">
                <table style="width: 100%; border-collapse: collapse;">${renderNested(value, depth + 1)}</table>
              </td>
            </tr>
          `;
        }

        return `
          <tr style="background-color: ${bg};">
            <td style="padding: 10px; border: 1px solid #ccc; font-weight: bold;">${key}</td>
            <td style="padding: 10px; border: 1px solid #ccc;">${value || "N/A"}</td>
          </tr>
        `;
      })
      .join("");
  };

  return `
    <h2 style="color: #333;">New Incorporation Submission</h2>
    <table style="width: 100%; border-collapse: collapse; border: 1px solid #ccc;">
      ${renderNested(data)}
    </table>
  `;
};

// Job application formatting
const formatJobApplicationSubmission = (data) => {
  return `
    <h2 style="color: #333;">New Job Application</h2>
    <table style="border-collapse: collapse; width: 100%; border: 1px solid #ccc;">
      <tr><td style="padding: 10px; border: 1px solid #ccc;"><strong>Full Name:</strong></td><td>${data.fullName || "N/A"}</td></tr>
      <tr><td style="padding: 10px; border: 1px solid #ccc;"><strong>Email:</strong></td><td>${data.email || "N/A"}</td></tr>
      <tr><td style="padding: 10px; border: 1px solid #ccc;"><strong>Phone:</strong></td><td>${data.phone || "N/A"}</td></tr>
      <tr><td style="padding: 10px; border: 1px solid #ccc;"><strong>Job Title:</strong></td><td>${data.jobTitle || "N/A"}</td></tr>
      <tr><td style="padding: 10px; border: 1px solid #ccc;"><strong>Cover Letter:</strong></td><td>${(data.coverLetter || "N/A").replace(/\n/g, "<br/>")}</td></tr>
    </table>
  `;
};
