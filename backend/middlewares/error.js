import { ApiError } from "../utils/APIError.js";
const errorHandlerMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    if (err.name === "CastError") {
        const message = `Resource not found. Invalid ${err.path}`;
        err = new ApiError(400, message);
    }

    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ApiError(400, message);
    }

    if (err.name === "JsonWebTokenError") {
        const message = `Json web token is invalid, try again`;
        err = new ApiError(400, message);
    }

    if (err.name === "TokenExpiredError") {
        const message = `Json web token is expired, try again`;
        err = new ApiError(400, message);
    }

    res.status(err.statusCode).json({
        statusCode: err.statusCode,
        success: false,
        message: err.message,
    });
};

export default errorHandlerMiddleware;
