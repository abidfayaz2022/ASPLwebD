// pages/api/s3-upload-url.js

import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: 'AKIAQRMGVE3O3DDDQBPB',
  secretAccessKey: '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',
  region: 'ap-southeast-1',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { fileName, fileType } = req.body;

  const Key = `public/uploads/${Date.now()}-${fileName}`;

  const params = {
    Bucket: 'angel-frontend',
    Key,
    Expires: 60, // 1 minute
    ContentType: fileType,
    ACL: 'public-read',
  };

  try {
    const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
    res.status(200).json({
      uploadUrl,
      fileUrl: `https://angel-frontend.s3.ap-southeast-1.amazonaws.com/${Key}`,
    });
  } catch (err) {
    console.error('S3 Error:', err);
    res.status(500).json({ error: 'Failed to generate upload URL' });
  }
}
