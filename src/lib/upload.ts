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

interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
}

export const uploadOnCloudinary = async (file: File): Promise<CloudinaryUploadResponse | null> => {
  try {
    const buffer = await file.arrayBuffer();
    const result = await new Promise<CloudinaryUploadResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (result) {
            resolve(result as CloudinaryUploadResponse);
          } else {
            reject(error);
          }
        }
      );
      uploadStream.end(Buffer.from(buffer));
    });
    console.log('done uploading');
    return result;
  } catch (error) {
    console.error('Error uploading to Cloudinary', error);
    return null;
  }
};

export const deleteFromCloudinary = async (publicId: string) => {
  try {
    const response = await cloudinary.uploader.destroy(publicId);
    console.log('Deleted from Cloudinary', response);
    return response;
  } catch (error) {
    console.error('Error deleting from Cloudinary', error);
    return null;
  }
};
