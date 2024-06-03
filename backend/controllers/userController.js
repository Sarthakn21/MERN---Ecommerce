import User from "../models/userModel.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const registerUser = catchAsyncError(async (req, res, next) => {
    const avatarLocalPath = req.file?.path;
    const myCloud = await uploadOnCloudinary(avatarLocalPath, "avatar");
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    });

});
const demo = async (req, res, next) => {
    try {

        console.log("inside the demo controller", req.file)
        const avatarLocalPath = req.file?.path;
        let avatar;
        if (avatarLocalPath) avatar = await uploadOnCloudinary(avatarLocalPath, "avatar");
    } catch (error) {
        console.log(error)
    }
};
export { registerUser, demo }