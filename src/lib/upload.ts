import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";

dotenv.config({
  path: './.env',
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });
    if (response) {
      console.log('done uploading');
    }
    return response;
  } catch (error) {
    console.error('Error uploading to Cloudinary', error);
    return null;
  }
};