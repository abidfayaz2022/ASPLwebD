import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import s3Client from '../lib/s3Client.js';
import { v4 as uuid } from 'uuid';

/**
 * Upload a single file to S3 and return the file URL.
 * @param {Object} file - A file object from multer
 * @param {String} folder - Folder path (e.g., users/123/docs)
 * @returns {String} - S3 file URL
 */
export const uploadFileToS3 = async (file, folder = 'uploads') => {
  const key = `${folder}/${uuid()}-${file.originalname}`;
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype
  };

  await s3Client.send(new PutObjectCommand(params));

  return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};

/**
 * Upload multiple files to S3 and return an array of URLs.
 * @param {Array} files - Array of file objects (from multer)
 * @param {String} folder - Target folder path
 * @returns {Array<String>} - Array of uploaded S3 URLs
 */
export const uploadFilesToS3 = async (files = [], folder = 'uploads') => {
  return Promise.all(files.map(file => uploadFileToS3(file, folder)));
};

/**
 * Delete a file from S3 using its object key.
 * @param {String} key - S3 object key (not the full URL)
 * @returns {Promise<void>}
 */
export const deleteFileFromS3 = async (key) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key
  };
  await s3Client.send(new DeleteObjectCommand(params));
};

/**
 * Extract the S3 object key from a full S3 file URL.
 * @param {String} url - Full S3 file URL
 * @returns {String|null} - Object key or null if invalid
 */
export const extractS3Key = (url) => {
  const splitPoint = '.amazonaws.com/';
  const parts = url.split(splitPoint);
  return parts.length === 2 ? parts[1] : null;
};
