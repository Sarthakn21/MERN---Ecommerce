import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const loginUser = createAsyncThunk('loginUser', async (credentials, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:5000/api/v1/users/login', credentials, {
            withCredentials: true
        })
        console.log(response.data.user)
        return response.data.user
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    message: null,
}
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                console.log("pending state")
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.loading = false;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.log("error occured", action.payload)
                state.error = action.payload;
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.message = action.payload.message;

            });
    },
})
export const { } = authSlice.actions;
export default authSlice.reducer;