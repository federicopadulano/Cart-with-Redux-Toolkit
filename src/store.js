import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./features/cart/cartSlice";
import modalSliceReducer from "./features/modal/modalSlice";

export const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
    modal: modalSliceReducer,
  },
});
