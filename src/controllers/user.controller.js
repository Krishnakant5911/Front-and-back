import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiErrors.js';
import User from '../models/user.models.js';
import uploadToCloudinary from '../utils/cloudinary.js';
import ApiResponse from '../utils/ApiResponse.js';

const registerUser = asyncHandler(async (req, res, next) => {
//    get user details from frontend
// validation - not empty
// check if user already exist: username, email
// check for images,check for avatar
// upload to the cloudinary
// create user object- create entry in db
// remove password and refreshtoken from response
// check for user creation
// return response

   const{username,fullName,email,password} = req.body;
    console.log("password:", password);
    console.log("email:", email);

    if(
        [username, fullName, email, password].some ((field)=> field?.trim() === "" )
    ){
        throw new ApiError(400, "All fields are required");
    }
    const existedUser = User.findOne({
        $or: [{ email }, { username }]
    })
    if(existedUser){
        throw new ApiError(409, "User already exist");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coveimageLocalPath = req.files?.coverimage[0]?.path;
    
    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required");
    }
       
    const avatar = await uploadToCloudinary(avatarLocalPath);
    const coverimage = await uploadToCloudinary(coveimageLocalPath);
    
     if(!avatar){
        throw new ApiError(400, "Failed to upload avatar");
     }

      const user =  await User.create({
        fullName,
        username: username.toLowerCase(),
        email,
        password,
        avatar : avatar.url,
        coverimage: coverimage?.url || "",
     })

       const createdUser = await User.findById(user._id).select("-password -refreshToken");
         if(!createdUser){
          throw new ApiError(500, "Something went wrong while registering user");
         }
         return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"));
}    

);
export {registerUser};