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
    },

    applyDiscount: (state) => {
      if (state.itemsCart.length === 0 || !state.discount) return;

      let totalModified = false;

      state.itemsCart = state.itemsCart.map((item) => {
        const priceDiscount = item.priceDiscount || 0;

        let newPriceDiscount = priceDiscount;

        if (item.discount > 0) {
          newPriceDiscount = discount(item.price, item.discount);

          if (newPriceDiscount !== priceDiscount) {
            totalModified = true;
          }
        }

        return {
          ...item,
          priceDiscount: newPriceDiscount,
          subTotal: newPriceDiscount * item.quantity,
        };
      });

      if (totalModified) {
        state.totalPrice = state.itemsCart.reduce(
          (total, item) => total + item.subTotal,
          0
        );
      }
    },

    removeItemCart: (state, action) => {
      const itemToRemove = state.itemsCart.find(
        (item) => item.id === action.payload.id
      );

      if (itemToRemove) {
        if (itemToRemove.quantity > 1) {
          itemToRemove.quantity -= 1;

          itemToRemove.subTotal =
            itemToRemove.discount && itemToRemove.discount > 0
              ? discount(itemToRemove.price, itemToRemove.discount) *
                itemToRemove.quantity
              : itemToRemove.price * itemToRemove.quantity;
        } else {
          state.itemsCart = state.itemsCart.filter(
            (item) => item.id !== action.payload.id
          );
        }
      }

      state.totalPrice = totalCart(state.itemsCart);
      state.quantity = state.itemsCart.reduce(
        (total, item) => total + item.quantity,
        0
      );
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
