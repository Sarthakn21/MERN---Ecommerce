import catchAsyncError from "../middlewares/catchAsyncError.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import { ApiError } from "../utils/APIError.js";

const createOrder = catchAsyncError(async (req, res, next) => {
    const {
        customerDetail,
        orderItems,
        totalPrice,
    } = req.body;
    console.log(customerDetail, orderItems, totalPrice);
    const order = await Order.create({
        customerDetail,
        orderItems,
        totalPrice,
        user: req.user._id,
        status: "pending",
        payment: false,
    });
    if (order) {
        order.orderItems.forEach(async (order) => {
            const product = await Product.findById(order.productId);
            product.stock -= order.quantity;
            await product.save({ validateBeforeSave: true });
        });
    }
    res.status(200).json({
        success: true,
        order,
    });

})
const getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) {
        return next(new ApiError(404, "Order not found"));
    }
    res.status(202).json({
        success: true,
        order,
    });
});

const userOrders = catchAsyncError(async (req, res, next) => {
    const order = await Order.find({ user: req.user._id });
    if (!order) {
        return next(new ApiError(404, "You don't have any orders"));
    }
    res.status(202).json({
        success: true,
        order,
    });
});
const getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();
    if (!orders) {
        return next(new ApiError(404, "You don't have any orders",));
    }

    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    });
});
const updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ApiError(404, "No order found"));
    }
    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("Order already delivered", 400));
    }
    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }
    order.save({ validateBeforeSave: true });
    res.status(200).json({
        success: true,
    });
});
export { createOrder, userOrders, getSingleOrder, getAllOrders }