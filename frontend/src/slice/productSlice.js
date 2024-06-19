import { createSlice } from "@reduxjs/toolkit";
import { addReview, categoryWiseProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../actions/productActions";


const initialState = {
    totalProducts: 0,
    products: [],
    loading: false,
    error: null,
}
export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload)
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.totalProducts = action.payload.totalFetched;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.totalProducts = 0;
                state.products = [];
            })
            .addCase(getProductById.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                state.totalProducts = 0;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.product;
                state.error = null;
                state.totalProducts = 1;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.totalProducts = 0;
            })
            .addCase(deleteProduct.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter(product => product._id !== action.payload.productId)
                state.error = null;
                state.totalProducts = state.totalProducts > 0 ? state.totalProducts - 1 : 0;

            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateProduct.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.map(product => product._id === action.payload.product._id ? action.payload.product : product)
                state.error = null;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addReview.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addReview.fulfilled, (state, action) => {
                state.loading = false;
                // console.log("action payload: " + action.payload.product._id);
                if (state.products.length > 0) {
                    state.products = state.products.map(product => product._id === action.payload.product._id ? action.payload.product : product)
                } else {
                    state.products.push(action.payload.product)
                    state.totalProducts = state.totalProducts + 1;
                }
                state.error = null;
            })
            .addCase(addReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.totalProducts = state.products.length;
            })
            .addCase(categoryWiseProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(categoryWiseProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.totalProducts = action.payload.totalFetched;
                const transformedProducts = [];
                Object.keys(action.payload.product).forEach(category => {
                    transformedProducts.push({
                        category,
                        items: action.payload.product[category],
                    });
                });

                state.products = transformedProducts;
            })
            .addCase(categoryWiseProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.totalProducts = state.products.length;
            })
    }
})
export const { addProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;