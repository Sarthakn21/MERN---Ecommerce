import catchAsyncError from "../middlewares/catchAsyncError.js";
import Product from "../models/productModel.js";
import { ApiError } from "../utils/APIError.js";
import User from "../models/userModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createProduct = catchAsyncError(async (req, res, next) => {
    const images = [];
    const { name, description, price, stock, category, } = req.body;
    if (!req.files || req.files.length === 0) {
        return next(new ApiError(401, "Images are required"));
    }

    if (!name || !description || !price || !stock || !category) {
        return next(new ApiError(400, "Name, description, price, stock,ratings,category are required"));
    }

    req.files.forEach((file) => {
        images.push(file.path);
    });

    const imageLinks = await Promise.all(images.map(async (image) => {
        const myCloudImage = await uploadOnCloudinary(image, "product");
        return {
            public_id: myCloudImage.public_id,
            url: myCloudImage.secure_url,
        };
    }));

    req.body.images = imageLinks;
    req.body.user = req.user._id;

    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product,
    });
});

//get all product
const getAllProducts = async (req, res, next) => {
    try {
        let query = Product.find();
        const { keyword, category, gt, lt, rating_gte } = req.query;
        if (keyword) {
            query = query.find({ name: { $regex: keyword, $options: "i" } });
        }
        if (category) {
            query = query.find({ category });
        }
        if (gt) {
            query = query.find({ price: { $gt: gt } });
        }
        if (lt) {
            query = query.find({ price: { $lt: lt } });
        }
        if (gte) {
            query = query.find({ rating: { $gte: rating_gte } });
        }
        const productsCount = await query.countDocuments();
        const resultPerPage = parseInt(req.query.limit) || 10;
        const currentPage = parseInt(req.query.page) || 1;
        const skip = (currentPage - 1) * resultPerPage;
        query = query.limit(resultPerPage).skip(skip);
        const products = await query;
        res.status(200).json({
            success: true,
            products,
            productsCount,
            resultPerPage,
        });
    } catch (error) {
        return next(new ApiError(500, "Products not found"));
    }
};


export { createProduct };
