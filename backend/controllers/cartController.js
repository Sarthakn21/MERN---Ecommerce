import catchAsyncError from "../middlewares/catchAsyncError.js";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import { ApiError } from "../utils/APIError.js";

// Add a product to the cart
const addToCart = catchAsyncError(async (req, res, next) => {
    const { productId } = req.body;
    const quantity = 1;

    if (!productId) {
        return next(new ApiError(400, "Product ID and quantity are required"));
    }

    const product = await Product.findById(productId);
    if (!product) {
        return next(new ApiError(404, "Product not found"));
    }
    if (product.stock <= 0) {
        return next(new ApiError(404, "Product is out of stock"));
    }

    let cart = await Cart.findOne({ user: req.user._id });

    let addedProduct;
    if (!cart) {
        cart = new Cart({ user: req.user._id, products: [{ product: productId, quantity }] });
        addedProduct = cart.products[0];
    } else {
        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
        if (productIndex > -1) {
            cart.products[productIndex].quantity += 1;
            addedProduct = cart.products[productIndex];
        } else {
            cart.products.push({ product: productId, quantity });
            addedProduct = cart.products[cart.products.length - 1];
        }
    }

    await cart.populate('products.product', 'name price images ratings');
    await cart.save();

    const responseProduct = {
        productId: addedProduct.product._id,
        name: addedProduct.product.name,
        price: addedProduct.product.price,
        ratings: addedProduct.product.ratings,
        images: addedProduct.product.images,
        quantity: addedProduct.quantity,
    };

    res.status(201).json({
        success: true,
        addedProduct: responseProduct,
    });
});


// Get all cart products for a user
const getCart = catchAsyncError(async (req, res, next) => {
    const cart = await Cart.findOne({ user: req.user._id }).populate('products.product', 'name price images ratings');
    if (!cart) {
        return next(new ApiError(404, "Cart not found"));
    }
    // console.log(cart)
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
