import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/v1/',
    withCredentials: true,
});
export const createProduct = createAsyncThunk('product/create', async (product, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:5000/api/v1/product/create', product, {
            withCredentials: true
        })
        return response.data.product
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const getAllProducts = createAsyncThunk('product/getAll', async (details, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get('product/getproducts?')
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const getProductById = createAsyncThunk('product/getById', async (id, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(`product/getproducts/${id}`)
        return data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})
export const deleteProduct = createAsyncThunk('product/delete', async (id, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.delete(`product/deleteproduct/${id}`)
        console.log("delete data", data)
        return data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const updateProduct = createAsyncThunk('product/update', async (product, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.patch(`product/updateproduct/${product._id}`, product)
        return data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const addReview = createAsyncThunk('product/addReview', async (details, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.post('product/addreview', details)
        console.log("reviev added", data)
        return data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})
export const categoryWiseProduct = createAsyncThunk('product/categoryWiseProduct', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get('product/getcategoryproduct')
        console.log(data)
        return data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})