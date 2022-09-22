import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
//import { useGetAllProductsQuery } from "./productsApi";
//import productsApi from "./productsApi";

const initialState = {
    items: [],
    status: null,
    error: null
}

export const productsFetch = createAsyncThunk(
    "products/productsFetch",
    async () => {  
        const response = await axios.get('http://localhost:5000/products');
        return response?.data; 
    }
)

//export const productsPostFe

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: {
        [productsFetch.pending]: (state, action) => {
            state.status = 'pending';
        },
        [productsFetch.fulfilled]: (state, action) => {
            state.status = 'success';
            state.items = action.payload;
        },
        [productsFetch.rejected]: (state, action) => {
            state.status = 'rejected';
        }
    }
})

export default productsSlice.reducer;