import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  localId: "",
  profilePicture: "",
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.email
      state.token = action.payload.idToken;
      state.localId = action.payload.localId;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.localId = null;
      state.profilePicture = "";
    },
    setProfilePicture: (state, action) => {
      state.profilePicture = action.payload;
    },
  },
});
export const { setUser, logout, setProfilePicture } = authSlice.actions;
export default authSlice.reducer;
