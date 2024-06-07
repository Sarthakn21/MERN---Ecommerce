import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../slice/productSlice";
import authSlice from "../slice/authSlice";

export const store = configureStore({
  reducer: {
    product: productSlice,
    auth: authSlice
  },
});