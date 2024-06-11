import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../actions/authActions";


const localItem = localStorage.getItem('authUser')
const initialState = {
    user: localItem ? JSON.parse(localItem) : null,
    isAuthenticated: localItem ? true : false,
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
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.loading = false;
                state.error = null;
                state.message = null;
                localStorage.setItem("authUser", JSON.stringify(action.payload));
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.log("error occured", action.payload)
                state.error = action.payload;
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.message = action.payload.message;

            })
            .addCase(logoutUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.user = null;
                state.isAuthenticated = false;
                state.loading = false;
                state.error = null;
                state.message = "Logout successfull"
                localStorage.removeItem("authUser");
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(registerUser.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                state.message = null;
                state.isAuthenticated = false;
                state.user = null;
                console.log("in register user pending state")
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.loading = false;
                state.error = null;
                state.message = action.payload.message;
                console.log("in register user fulfilled state")
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
                state.message = action.payload.message;
                state.isAuthenticated = false;
                state.user = null;
                console.log("in register user rejected state")
            })
            .addCase(getCurrentUser.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                state.message = null;

            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.loading = false;
                state.error = null;
                state.message = null;
                localStorage.setItem("authUser", JSON.stringify(action.payload));
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
                state.message = action.payload.message;
                state.isAuthenticated = false;
                state.user = null;
            })
    },
})
export const { } = authSlice.actions;
export default authSlice.reducer;