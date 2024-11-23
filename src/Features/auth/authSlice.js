import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  tokenId: null,
  localId: "",
  profilePicture: "",
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = {
        email: action.payload.email,
      };
      state.tokenId = action.payload.idToken;
      state.localId = action.payload.localId;
    },
    logout: (state) => {
      state.user = null;
      state.tokenId = null;
      state.localId = null;
    },
    setProfilePicture: (state, action) => {
      state.profilePicture = action.payload;
    },
  },
});
export const { setUser, logout, setProfilePicture } = authSlice.actions;
export default authSlice.reducer;
