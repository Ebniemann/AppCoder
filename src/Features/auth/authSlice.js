import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = {
        email: action.payload.email,
        tokenId: action.payload.idToken,
      };
    },
    logout: (state) => {
      state.user = null;
    },
  },
});
export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
