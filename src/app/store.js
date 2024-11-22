import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "../Features/shop/shopSlice";
import cartReducer from "../Features/cart/cartSlice";
import { shopApi } from "../Service/shopService";
import { locationApi } from "../Service/locationService";
import { orderApi } from "../Service/orderService";
import { authApi } from "../Service/authService";
import authReducer from "../Features/auth/authSlice";
import { userApi } from "../Service/userService";

export const store = configureStore({
  reducer: {
    shopReducer,
    [shopApi.reducerPath]: shopApi.reducer,
    cartReducer,
    [locationApi.reducerPath]: locationApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    authReducer,
    [userApi.reducerPath]: userApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(shopApi.middleware)
      .concat(locationApi.middleware)
      .concat(orderApi.middleware)
      .concat(authApi.middleware)
      .concat(userApi.middleware),
});
