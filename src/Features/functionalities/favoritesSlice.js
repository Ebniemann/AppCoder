import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteItems: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const product = action.payload;
      const isAlreadyFavorite = state.favoriteItems.some(
        (item) => item.id === product.id
      );
      if (isAlreadyFavorite) {
        state.favoriteItems = state.favoriteItems.filter(
          (item) => item.id !== product.id
        );
      } else {
        state.favoriteItems.push(product);
      }
    },
  },
});

export const { addFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
