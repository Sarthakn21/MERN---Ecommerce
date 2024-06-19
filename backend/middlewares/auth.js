import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { ApiError } from '../utils/APIError.js';
import catchAsyncError from './catchAsyncError.js';
const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { accessToken } = req.cookies;
    // console.log("cookie got :", accessToken)

    if (!accessToken) {
        return next(new ApiError(401, "Please LogIn to access the requested resource"));
    }

    const decodedData = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);
    req.user = await User.findById(decodedData._id);
    next();
});
export default isAuthenticatedUser;