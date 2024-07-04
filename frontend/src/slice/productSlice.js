import { createSlice } from "@reduxjs/toolkit";
import { addReview, adminproduct, categoryWiseProduct, createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../actions/productActions";


const initialState = {
    totalProducts: 0,
    products: [],
    success: false,
    loading: false,
    error: null,
}
export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        clearError: (state, action) => {
            // state.loading = false;
            state.error = null;
            state.success = false;
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload)
        },
        resetSuccess: (state, action) => {
            state.success = false;
            console.log("state", state)
        },
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
                state.products.push(action.payload.product);
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
                state.success = false;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter(product => product._id !== action.payload.productId)
                state.error = null;
                state.totalProducts = state.totalProducts > 0 ? state.totalProducts - 1 : 0;
                state.success = true;

            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
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
            .addCase(createProduct.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = true;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
            .addCase(adminproduct.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(adminproduct.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = true;
                state.products = action.payload.products;
                state.totalProducts = action.payload.products.length;
            })
            .addCase(adminproduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
    }
})
export const { clearError, removeProduct, resetSuccess } = productSlice.actions;
export default productSlice.reducer;