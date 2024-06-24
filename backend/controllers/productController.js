import catchAsyncError from "../middlewares/catchAsyncError.js";
import Product from "../models/productModel.js";
import { ApiError } from "../utils/APIError.js";
import User from "../models/userModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiFeatures } from "../utils/apiFeatures.js";
import cloudinary from "cloudinary";

const createProduct = catchAsyncError(async (req, res, next) => {
    const images = [];
    const { name, description, price, stock, mainCategory, subCategory } = req.body;
    // console.log("in backedn", req.body)
    // console.log("in backedn file", req.files)
    // console.log(req.body.size)
    if (!req.files || req.files.length === 0) {
        return next(new ApiError(401, "Images are required"));
    }

    if (!name || !description || !price || !stock || !mainCategory) {
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
    req.body.category = {
        main: mainCategory.toLowerCase(),
        ...(subCategory ? { sub: subCategory.toLowerCase() } : {})
    };

    const product = await Product.create(req.body);
    console.log(product)
    res.status(201).json({
        success: true,
        product,
    });
});

//get all product by filters and pagination
const getAllProducts = async (req, res, next) => {
    try {

        const limit = req.query.limit ? req.query.limit : 10;
        const apiFeatures = new ApiFeatures(Product.find(), req.query)
            .search()
            .filter()
            .pagination(limit);
        const products = await apiFeatures.query;
        if (products.length == 0) return next(new ApiError(404, "Product not found"))
        res.status(200).json({
            success: true,
            totalFetched: products.length,
            products

        });
    } catch (error) {
        return next(new ApiError(500, "Products not found"));
    }
};

//get product by id
const getProductById = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) return next(new ApiError(404, "Product not found"));
    res.status(200).json({ success: true, product })
})

//delete product
const deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) return next(new ApiError(404, "Product not found"));
    const { images } = product
    images.forEach(async image => {
        await cloudinary.v2.uploader.destroy(image.public_id)
    })
    await product.deleteOne();
    res.status(200).json({ success: true, message: "Product deleted successfully", productId: req.params.id })
});

//update product
const updateProduct = async (req, res, next) => {
    let uploadedImageLinks = [];
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return next(new ApiError(404, "Product not found"));

        const { name, description, price, stock, category, size } = req.body;
        // if (!name || !description || !price || !stock || !category) {
        //     return next(new ApiError(400, "Name, description, price, stock, category are required"));
        // }
        if (req.files && req.files.length > 0) {
            const images = req.files.map(file => file.path);
            uploadedImageLinks = await Promise.all(images.map(async (image) => {
                const myCloudImage = await uploadOnCloudinary(image, "product");
                return {
                    public_id: myCloudImage.public_id,
                    url: myCloudImage.secure_url,
                };
            }));
            product.images.push(...uploadedImageLinks);
        }

        product.name = name ? name : product.name;
        product.description = description ? description : product.description;
        product.price = price ? price : product.price;
        product.stock = stock ? stock : product.stock;
        product.category = category ? category : product.category;
        product.size = size ? size : product.size;

        await product.save();

        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        for (const imageLink of uploadedImageLinks) {
            try {
                await cloudinary.uploader.destroy(imageLink.public_id);
            } catch (deleteError) {
                console.error("Error deleting uploaded image:", deleteError);
            }
        }
        next(new ApiError(500, "Error updating product"));
    }
};

//create review
const createReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const product = await Product.findById(productId);
    if (!product) return next(new ApiError(404, "Product not found"));
    //create review
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };
    product.reviews.push(review);
    product.numOfReview = product.reviews.length;
    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
    await product.save();
    res.status(201).json({
        success: true,
        product,
    });
})

//get all reviews
const getAllReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    if (!product) return next(new ApiError(404, "Product not found"));
    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
})

const getCategoryProduct = catchAsyncError(async (req, res, next) => {
    try {
        const mainCategories = await Product.distinct("category.main");
        const product = {};
        for (const mainCategory of mainCategories) {
            const products = await Product.find({ "category.main": mainCategory }).limit(4).select('-reviews');
            product[mainCategory] = products;
        }

        const totalFetched = Object.values(product).reduce((sum, products) => sum + products.length, 0);
        if (totalFetched === 0) return next(new ApiError(404, "Products not found"));
        res.status(200).json({
            success: true,
            totalFetched,
            product
        });
    } catch (error) {
        return next(new ApiError(500, "Products not found"));
    }
});

const AdminProducts = catchAsyncError(async (req, res, next) => {
    console.log(req.user._id)
    const products = await Product.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        products,
    });
});



export { AdminProducts, createProduct, getAllProducts, getProductById, deleteProduct, updateProduct, createReview, getAllReviews, getCategoryProduct };
