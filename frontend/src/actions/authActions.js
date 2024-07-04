import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const loginUser = createAsyncThunk('loginUser', async (credentials, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:5000/api/v1/users/login', credentials, {
            withCredentials: true
        })
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
export const updateProfile = createAsyncThunk('updateProfile', async (data, { rejectWithValue }) => {
    try {
        console.log("this is data on update profile", data)
        const response = await axios.put('http://localhost:5000/api/v1/users/updateprofile', data, {
            withCredentials: true
        })
        console.log("updateProfile response", response.data.user)
        return response.data.user
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const getAllUsers = createAsyncThunk('getAllUsers', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('http://localhost:5000/api/v1/users/getalluser', {
            withCredentials: true
        })
        console.log("all users response", response.data.users)
        return response.data.users

    } catch (error) {
        return rejectWithValue(error.response.data)

    }

})