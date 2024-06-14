import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/v1/',
    withCredentials: true,
});

export const addToCart = createAsyncThunk('cart/Add', async (items, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('cart/add', items)
        console.log("this is add cart response: ", response.data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const getCart = createAsyncThunk('cart/Get', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get('cart/')
        console.log("this is get cart response: ", response.data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const updateCart = createAsyncThunk('cart/Update', async (details, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.patch('cart/update', details)
        console.log("this is update cart response: ", response.data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const deleteItem = createAsyncThunk('cart/Delete', async (productId, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`cart/remove/${productId}`)
        console.log(response.data.productId)
        return response.data.productId

    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})