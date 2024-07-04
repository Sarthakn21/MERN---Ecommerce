import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../slice/productSlice";
import authSlice from "../slice/authSlice";
import cartSlice from "../slice/cartSlice";
import orderSlice from "../slice/orderSlice";

export const store = configureStore({
  reducer: {
    product: productSlice,
    auth: authSlice,
    cart: cartSlice,
    order: orderSlice,
  },
});