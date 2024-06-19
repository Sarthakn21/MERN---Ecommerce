import User from "../models/userModel.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/APIError.js";
import cloudinary from "cloudinary";
const registerUser = catchAsyncError(async (req, res, next) => {
    const avatarLocalPath = req.file?.path;
    // const myCloud = await uploadOnCloudinary(avatarLocalPath, "avatar");
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
    });
    const accessToken = await user.getJWTToken();
    const userWithoutPassword = await User.findById(user._id).select('-password');
    return res
        .status(200)
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({ success: true, message: "user registered successfully", user: userWithoutPassword });
});

const loginUser = catchAsyncError(async (req, res, next) => {
    console.log(req)
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ApiError(400, "Please Enter Email & Password"));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ApiError(401, "Invalid email or password"));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ApiError(401, "Invalid email or password"));
    }
    const accessToken = await user.getJWTToken();
    const userWithoutPassword = await User.findById(user._id).select('-password');
    return res
        .status(200)
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({ success: true, message: "user Loggedin successfully", user: userWithoutPassword });
});
const logoutUser = catchAsyncError(async (req, res, next) => {
    return res
        .status(200)
        .clearCookie("accessToken", {
            httpOnly: true,
            secure: true,
        })
        .json({ success: true, message: "user Logged out successfully" });
});
const getCurrentUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user,
    });
});

const updateProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        email: req.body.email,
        name: req.body.name,
    };

    if (req.file) {
        const user = await User.findById(req.user._id);
        const imageId = user.avatar.public_id;
        if (imageId) {
            await cloudinary.v2.uploader.destroy(imageId);
        }
        const myCloudImage = await uploadOnCloudinary(req.file.path, "avatar");
        newUserData.avatar = {
            public_id: myCloudImage.public_id,
            url: myCloudImage.secure_url,
        };
    }
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: newUserData,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success: true,
        user,
        message: "user profile updated successfully",
    });
});

const getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});

const getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(
            new ApiError(500, `User does not exist with Id ${req.params.id}`)
        );
    }

    res.status(200).json({
        success: true,
        user,
    });
});

const deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) return next(new ApiError(500, "User does not exist to id"));
    await user.deleteOne();
    res.status(200).json({ success: true, message: "User deleted successfully" });
});

const demo = async (req, res, next) => {
    try {
        console.log("inside the demo controller", req.file);
        const avatarLocalPath = req.file?.path;
        let avatar;
        if (avatarLocalPath)
            avatar = await uploadOnCloudinary(avatarLocalPath, "avatar");
    } catch (error) {
        console.log(error);
    }
};
export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    updateProfile,
    getAllUsers,
    getSingleUser,
    deleteUser,
    demo,
};
