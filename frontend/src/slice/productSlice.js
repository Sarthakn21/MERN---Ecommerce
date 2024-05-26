import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    products: ["i am a product"]
}
export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload)
        },
        removeProduct: (state, action) => { 
            state.products = state.products.filter(product => product.id!== action.payload)
        }
    } 
})
export const { addProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;