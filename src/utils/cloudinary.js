import {v2 as cloudinary} from 'cloudinary';

import fs from 'fs';



cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME ,
    api_key: process.env.CLOUDINARY_API_KEY ,
    api_secret: process.env.CLOUDINARY_API_SECRET ,
});


const uploadToCloudinary = async (localfilepath) => {
    try {
        if(!localfilepath) return null;
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localfilepath,{
            resource_type:"auto",
        });
        // file has been uploaded successfully 
        console.log("file uploaded to cloudinary successfully",
              response.url);
    } catch (error) {
        fs.unlinkSync(localfilepath);
        // remove the locally saved temporry file as the uploads operation is complete
        return null;
    }
}

export default uploadToCloudinary;