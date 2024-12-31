import s3 from '../config/aws.config.js';
import ENV from './lib/env.config.js';
import fs from 'fs'


export const uploadFileToS3 = async (file)=> {
  console.log(file,'file')
  const publicId = `${Date.now()}-${file.name}`; // You can use a timestamp + file name as the public ID

  const fileContent = fs.readFileSync(file.tempFilePath);
  console.log(fileContent,'fileContent')

  const uploadParams = {
    Bucket: ENV.S3_BUCKET_NAME,
    Key: `images/${publicId}`,
    Body: fileContent,
    ContentType: file.mimetype,
  };

  try {
    const data = await s3.upload(uploadParams).promise( );
    console.log("data",data)
    return {
        url: data.Location, // URL of the uploaded file
        publicId: publicId,   // Public ID is the file name or custom identifier
        mimetype: file.mimetype, // MIME type of the uploaded file
    };
  } catch (err) {
    throw new Error('Error uploading file: ' + err.message);
  }
};