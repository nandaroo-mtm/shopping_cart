import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const productsApi= createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl : "http://localhost:5000"
    }),
    endpoints:(builder) => ({
        getAllProducts : builder.query({
            query: () => "products"
        })/* ,
        getProductById : builder.query({
            query: (id) => `products/${id}`
        }) */
    })
})

export default productsApi;
export const { useGetAllProductsQuery }= productsApi