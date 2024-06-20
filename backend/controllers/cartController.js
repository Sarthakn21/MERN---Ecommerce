import catchAsyncError from "../middlewares/catchAsyncError.js";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import { ApiError } from "../utils/APIError.js";

// Add a product to the cart
const addToCart = catchAsyncError(async (req, res, next) => {
    const { productId } = req.body;
    const quantity = 1;
    let productIndex = 0;
    if (!productId) {
        return next(new ApiError(400, "Product ID and quantity are required"));
    }

    const product = await Product.findById(productId);
    if (!product) {
        return next(new ApiError(404, "Product not found"));
    }
    if (product && product.stock <= 0) {
        return next(new ApiError(404, "Product is out of stock"));
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
        cart = new Cart({ user: req.user._id, products: [{ product: productId, quantity }] });
    } else {
        productIndex = cart.products.findIndex(p => p.product.toString() === productId);
        if (productIndex > -1) {
            cart.products[productIndex].quantity += 1;
        } else {
            cart.products.push({ product: productId, quantity });
        }
    }
    await cart.populate('products.product', 'name price images ratings');
    await cart.save();
    const addedProduct = {
        productId: cart.products[productIndex].product._id,
        name: cart.products[productIndex].product.name,
        price: cart.products[productIndex].product.price,
        ratings: cart.products[productIndex].product.ratings,
        images: cart.products[productIndex].product.images,
        quantity: cart.products[productIndex].quantity,
    };
    res.status(201).json({
        success: true,
        addedProduct,
    });
});

// Get all cart products for a user
const getCart = catchAsyncError(async (req, res, next) => {
    const cart = await Cart.findOne({ user: req.user._id }).populate('products.product', 'name price images ratings');
    if (!cart) {
        return next(new ApiError(404, "Cart not found"));
    }
    const cartItems = cart.products.map(item => ({
        productId: item.product._id,
        name: item.product.name,
        price: item.product.price,
        ratings: item.product.ratings,
        images: item.product.images,
        quantity: item.quantity,
    }));
    res.status(200).json({
        success: true,
        cartItems,
    });
});

// Update quantity of a product in the cart
const updateCartProduct = catchAsyncError(async (req, res, next) => {
    const { productId, quantity } = req.body;

    if (!productId || quantity == null) {
        return next(new ApiError(400, "Product ID and quantity are required"));
    }

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
        return next(new ApiError(404, "Cart not found"));
    }

    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
    if (productIndex === -1) {
        return next(new ApiError(404, "Product not found in cart"));
    }

    cart.products[productIndex].quantity = quantity;
    await cart.save();

    res.status(200).json({
        success: true,
        updatedItem: cart.products[productIndex],
    });
});

const removeCartProduct = catchAsyncError(async (req, res, next) => {
    const { productId } = req.params;

    if (!productId) {
        return next(new ApiError(400, "Product ID is required"));
    }

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
        return next(new ApiError(404, "Cart not found"));
    }

    cart.products = cart.products.filter(p => p.product.toString() !== productId);
    await cart.save();

    res.status(200).json({
        success: true,
        productId,
    });
});

export { addToCart, getCart, updateCartProduct, removeCartProduct };
