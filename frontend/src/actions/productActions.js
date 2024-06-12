import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const createProduct = createAsyncThunk('createProduct', async (product, { rejectWithValue }) => {
    try {
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})