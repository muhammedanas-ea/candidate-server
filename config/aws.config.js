import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import ENV from '../utils/lib/env.config.js';

dotenv.config();

AWS.config.update({
  accessKeyId: ENV.S3_ACCESS_KEY,
  secretAccessKey: ENV.S3_SECRET_KEY,
  region: ENV.S3_REGION,
});

const s3 = new AWS.S3();

export default s3;
