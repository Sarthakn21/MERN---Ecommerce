import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartCard from './CartCard';
import { updateCart, getCart, deleteItem } from '../../actions/cartActions';
import { useSnackbar } from 'notistack';
import Loader from '../Loader/Loader';
import { clearError } from '../../slice/cartSlice';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { createOrder } from '../../actions/orderActions';

export default function CartPage() {
    const dispatch = useDispatch();
    const { cartItems, loading, error, CartSuccess } = useSelector((state) => state.cart);
    const [total, setTotal] = useState(0);
    const [orderDetails, setOrderDetails] = useState({
        phoneNo: '',
        city: '',
        state: '',
        address: '',
        country: '',
        pinCode: ''
    });
    const { enqueueSnackbar } = useSnackbar();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmitOrder = () => {
        const orderData = {
            customerDetail: orderDetails,
            orderItems: cartItems.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.images[0],
                productId: item.productId,
            })),
            totalPrice: total,
        };
        console.log(orderData)
        dispatch(createOrder(orderData))
    };

    const handleClose = (id) => {
        console.log("close clicked", id);
        dispatch(deleteItem(id))
    };

    const handleIncreaseQuantity = (productId, quantity) => {
        dispatch(updateCart({ productId, quantity }));
    };

    const handleDecreaseQuantity = (productId, quantity) => {
        dispatch(updateCart({ productId, quantity }));
    };

    useEffect(() => {
        if (error && error.statusCode) {
            enqueueSnackbar(error.message, { variant: "error" });
            dispatch(clearError());
        }
    }, [error, enqueueSnackbar, dispatch]);

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    useEffect(() => {
        let tempTotal = 0;
        cartItems.forEach((item) => {
            tempTotal += item.price * item.quantity;
        });
        setTotal(tempTotal);
    }, [cartItems]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="flex md:justify-center md:items-center min-h-screen">
                    <div className="py-20 flex flex-col md:flex-row gap-3 w-full max-w-screen-lg px-4">
                        <div className="flex justify-center align-center">
                            <CartCard
                                cartItems={cartItems}
                                handleClose={handleClose}
                                handleIncreaseQuantity={handleIncreaseQuantity}
                                handleDecreaseQuantity={handleDecreaseQuantity}
                            />
                        </div>
                        <div className="w-full h-full px-1 md:px-5 flex flex-col sticky top-20">
                            <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                                <p className="text-xl font-medium">Order Details</p>
                                <p className="text-gray-400">Complete your order by providing details</p>
                                <div className="space-y-4">
                                    <label className="block text-sm font-medium">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        name="phoneNo"
                                        value={orderDetails.phoneNo}
                                        onChange={handleInputChange}
                                        className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Phone Number"
                                    />
                                    <label className="block text-sm font-medium">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={orderDetails.city}
                                        onChange={handleInputChange}
                                        className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="City"
                                    />
                                    <label className="block text-sm font-medium">
                                        State
                                    </label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={orderDetails.state}
                                        onChange={handleInputChange}
                                        className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="State"
                                    />
                                    <label className="block text-sm font-medium">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={orderDetails.address}
                                        onChange={handleInputChange}
                                        className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Address"
                                    />
                                    <label className="block text-sm font-medium">
                                        Country
                                    </label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={orderDetails.country}
                                        onChange={handleInputChange}
                                        className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Country"
                                    />
                                    <label className="block text-sm font-medium">
                                        Pin Code
                                    </label>
                                    <input
                                        type="text"
                                        name="pinCode"
                                        value={orderDetails.pinCode}
                                        onChange={handleInputChange}
                                        className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Pin Code"
                                    />
                                </div>
                                <div className="mt-6 border-t border-b py-2">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-gray-900">Subtotal</p>
                                        <p className="font-semibold text-gray-900">₹{total.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-gray-900">Shipping</p>
                                        <p className="font-semibold text-gray-900">₹40</p>
                                    </div>
                                </div>
                                <div className="mt-6 flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">Total</p>
                                    <p className="text-2xl font-semibold text-gray-900">₹{(total + 40).toFixed(2)}</p>
                                </div>
                                <Button
                                    onClick={handleSubmitOrder}
                                    variant="contained"
                                    color="primary"
                                    startIcon={<ShoppingCartCheckoutIcon />}
                                    className="mt-4 mb-8 w-full"
                                >
                                    Place Order
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
