import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/v1/',
    withCredentials: true,
});
export const createOrder = createAsyncThunk('createOrder', async (items, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('order/create', items)
        // console.log("thi is product action  ", items)
        console.log("this is add order response: ", response.data.order)
        return response.data.order
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})