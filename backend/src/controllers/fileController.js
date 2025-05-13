// src/controllers/fileController.js
import { Upload } from '@aws-sdk/lib-storage';
import s3Client from '../lib/s3Client.js';
import { Readable } from 'stream';

export const uploadFile = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file provided' });
    }

    const stream = Readable.from(file.buffer); // File buffer -> stream

    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${Date.now()}-${file.originalname}`,
        Body: stream,
        ContentType: file.mimetype,
      },
    });

    const result = await upload.done();

    res.status(200).json({
      message: 'File uploaded successfully',
      url: result.Location,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
};
