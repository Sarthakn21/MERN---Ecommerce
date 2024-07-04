import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customerDetail: {
        phoneNo: {
            type: Number,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },

        state: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        pinCode: {
            type: Number,
            required: true,
        },
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            productId: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: true,
            },
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    payment: {
        type: Boolean,
        required: true,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const Order = mongoose.model("Order", orderSchema)
export default Order;
