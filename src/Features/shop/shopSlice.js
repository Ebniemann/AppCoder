import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categorySelected: "",
  productSelected: null,
};

export const shopSlice = createSlice({
  name: "shopSlice",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.categorySelected = action.payload;
    },

    setProductId: (state, action) => {
      state.productSelected = { id: action.payload };
    },
  },
});
export const { setCategory, setProductId } = shopSlice.actions;
export default shopSlice.reducer;
