import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { addToCart, deleteItem, getCart, updateCart } from "../actions/cartActions";

const localCart = localStorage.getItem("cart");
const initialState = {
    cartItems: localCart ? JSON.parse(localCart) : [],
    loading: false,
    error: null,
}
const saveStateLS = (state) => {
    localStorage.setItem('cart', JSON.stringify(state));
};
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                const addedProduct = action.payload.addedProduct;
                const existingProductIndex = state.cartItems.findIndex(item => item.productId === addedProduct.productId);
                if (existingProductIndex > -1) {
                    state.cartItems[existingProductIndex].quantity = addedProduct.quantity;
                } else {
                    state.cartItems.push(addedProduct);
                }
                state.error = null;
                saveStateLS(state.cartItems);
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.cartItems = action.payload.cartItems;
                state.loading = false;
                state.error = null;
                saveStateLS(state.cartItems);
            })
            .addCase(getCart.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.loading = false;
                const updatedProduct = action.payload.updatedItem;
                state.cartItems = state.cartItems.map(item =>
                    item.productId === updatedProduct.product
                        ? { ...item, quantity: updatedProduct.quantity }
                        : item
                );
                state.error = null;
                saveStateLS(state.cartItems);
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = state.cartItems.filter(item => item.productId !== action.payload);
                state.error = null;
                saveStateLS(state.cartItems);
            })
            .addCase(deleteItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addMatcher(isAnyOf(addToCart.pending, getCart.pending, updateCart.pending, deleteItem.pending), (state) => {
                state.loading = true;
                state.error = null;
            })
    }
})
export default cartSlice.reducer;