import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const url = "https://course-api.com/react-useReducer-cart-project";

export const getAllItems = createAsyncThunk("/cart/getAllItems", () => {
  return fetch(url)
    .then((response) => response.json())
    .catch((err) => console.log(err));
});

const initialState = {
  cartItems: [],
  amount: 1,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increaseAmount: (state, action) => {
      const itemCart = state.cartItems.find(
        (item) => item.id === action.payload
      );
      itemCart.amount = itemCart.amount + 1;
    },
    decreaseAmount: (state, action) => {
      const itemCart = state.cartItems.find(
        (item) => item.id === action.payload
      );
      itemCart.amount = itemCart.amount - 1;
      if (itemCart.amount === 0) {
        itemCart.amount = 1;
      }
    },
    calculateTotals: (state) => {
      let amount = 0;
      let totals = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        totals += item.price * item.amount;
      });
      state.amount = amount;
      state.total = totals;
    },
  },
  extraReducers: {
    [getAllItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getAllItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  clearCart,
  removeItem,
  increaseAmount,
  decreaseAmount,
  calculateTotals,
} = cartSlice.actions;
export default cartSlice.reducer;
