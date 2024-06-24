import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/v1/',
    withCredentials: true,
});
export const createProduct = createAsyncThunk('product/create', async (product, { rejectWithValue }) => {
    try {
        console.log("inside create controler", product)
        const response = await axios.post('http://localhost:5000/api/v1/product/create', product, {
            withCredentials: true
        })
        return response.data.product
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const getAllProducts = createAsyncThunk('product/getAll', async (filters, { rejectWithValue }) => {
    try {
        const {
            category = "",
            subcategory,
            price = [0, 25000],
            ratings = 0,
            keyword,
        } = filters;
        let url = `http://localhost:5000/api/v1/product/getproducts?mainCategory=${category}s&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
        if (keyword) {
            url += `&keyword=${keyword}`
        }
        if (subcategory) {
            url += `&subCategory=${subcategory}`
        }
        const { data } = await axios.get(url, {
            withCredentials: true,
        })
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
export const adminproduct = createAsyncThunk("product/amdin", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get('product/adminproduct')
        console.log("admin data", data)
        return data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})