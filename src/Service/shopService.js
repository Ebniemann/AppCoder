import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url } from "../firebase/database";

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "categories.json",
    }),
    getProducts: builder.query({
      query: () => "products.json",
    }),
    getProductsByCategories: builder.query({
      query: (category) =>
        category
          ? `products.json?orderBy="category"&equalTo="${category}"`
          : `products.json`,

      transformResponse: (response) =>
        response ? Object.values(response) : [],
    }),
    getProduct: builder.query({
      query: (productId) => {
        return `products.json?orderBy="id"&equalTo=${productId}`;
      },
      transformResponse: (response) =>
        response ? Object.values(response)[0] : null,
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useGetProductsByCategoriesQuery,
} = shopApi;
