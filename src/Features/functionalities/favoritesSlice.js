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

    removeFavorite: (state, action) => {
      const productId = action.payload;
      state.favoriteItems = state.favoriteItems.filter(
        (item) => item.id !== productId
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
