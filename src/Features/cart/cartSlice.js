import { createSlice } from "@reduxjs/toolkit";
import { totalCart, subTotal, discount } from "../../utils/functions";

const initialState = {
  itemsCart: [],
  quantity: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addItemCart: (state, action) => {
      const productsCart = state.itemsCart.find(
        (item) => item.id === action.payload.id
      );

      if (productsCart) {
        state.itemsCart.map((item) => {
          if (item.id === action.payload.id) {
            item.quantity += 1;
            item.subTotal =
              item.discount && item.discount > 0
                ? discount(item.price, item.discount) * item.quantity
                : item.price * item.quantity;
          }
        });
      } else {
        const itemSubtotal =
          action.payload.discount && action.payload.discount > 0
            ? discount(action.payload.price, action.payload.discount)
            : action.payload.price;

        state.itemsCart.push({
          ...action.payload,
          quantity: 1,
          subTotal: itemSubtotal,
        });
      }

      state.totalPrice = totalCart(state.itemsCart);

      console.log("Carrito actualizado:", state.itemsCart);
      console.log("Precio total:", state.totalPrice);
    },

    applyDiscount: (state) => {
      let itemsModified = false;
      state.itemsCart = state.itemsCart.map((item) => {
        if (item.discount && item.discount > 0) {
          const priceDiscount = discount(item.price, item.discount);
          if (item.priceDiscount !== priceDiscount) {
            itemsModified = true;
            return {
              ...item,
              priceDiscount: priceDiscount,
            };
          }
        }
        return {
          ...item,
          priceDiscount: priceDiscount,
        };
      });
      if (itemsModified) {
        state.totalPrice = totalCart(state.itemsCart);
      }
    },

    removeItemCart: (state, action) => {
      state.itemsCart = state.itemsCart.filter(
        (item) => item.id != action.payload.id
      );
      state.totalPrice = totalCart(state.itemsCart);
      state.quantity -= 1;
    },

    clearCart: (state) => {
      state.itemsCart = [];
      state.totalPrice = 0;
      state.quantity = 0;
    },
  },
});
export const { addItemCart, removeItemCart, clearCart, applyDiscount } =
  cartSlice.actions;
export default cartSlice.reducer;
