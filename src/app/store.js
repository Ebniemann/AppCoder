import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "../Features/shop/shopSlice";
import cartReducer from "../Features/cart/cartSlice";
import { shopApi } from "../Service/shopService";
import { locationApi } from "../Service/locationService";

export const store = configureStore({
  reducer: {
    shopReducer,
    [shopApi.reducerPath]: shopApi.reducer,
    cartReducer,
    [locationApi.reducerPath]: locationApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(shopApi.middleware)
      .concat(locationApi.middleware),
});
