import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localPath, folder) => {
    if (!localPath) return null;

    try {
        const response = await cloudinary.uploader.upload(localPath, {
            folder: `${folder}`
        });
        fs.unlinkSync(localPath);
        return response;
    } catch (error) {
        console.log("error in cloudinary : ", error)
        fs.unlinkSync(localPath);
        return null;
    }
}

export { uploadOnCloudinary }