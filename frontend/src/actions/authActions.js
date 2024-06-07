import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const loginUser = createAsyncThunk('loginUser', async (credentials, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:5000/api/v1/users/login', credentials, {
            withCredentials: true
        })
        // console.log(response.data.user)
        return response.data.user
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const logoutUser = createAsyncThunk('logoutUser', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('http://localhost:5000/api/v1/users/logout', {
            withCredentials: true
        })
        // console.log("logout response", response.data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const registerUser = createAsyncThunk('registerUser', async (credentials, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:5000/api/v1/users/register', credentials, {
            withCredentials: true
        })
        return response.data.user
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const getCurrentUser = createAsyncThunk('getCurrentUser', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('http://localhost:5000/api/v1/users/getcurrentuser', {
            withCredentials: true
        })
        console.log("current user response", response.data.user)
        return response.data.user
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})