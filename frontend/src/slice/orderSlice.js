import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createOrder } from "../actions/orderActions";

const initialState = {
    orders: [],
    orderLoading: false,
    orderSuccess: false,
    orderStatus: null,
    orderError: null,
};

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        clearOrderError: (state, action) => {
            state.orderError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state, action) => {
                state.orderLoading = true;
                state.orderError = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.orderLoading = false;
                state.orderSuccess = true;
                state.orderError = null;
                state.orders = action.payload.orderItems;
                state.orderStatus = action.payload.status;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.orderLoading = false;
                state.orderError = action.payload;
                state.orderSuccess = false;
            })
    }
})
export const { clearOrderError } = orderSlice.actions;
export default orderSlice.reducer;