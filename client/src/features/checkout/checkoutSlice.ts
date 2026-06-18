import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CheckoutState, ShippingAddress } from "./checkoutTypes";

const initialState: CheckoutState = {
  shippingAddress: null,
  couponCode: "",
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,

  reducers: {
    saveShippingAddress(state, action: PayloadAction<ShippingAddress>) {
      state.shippingAddress = action.payload;
    },

    applyCoupon(state, action: PayloadAction<string>) {
      state.couponCode = action.payload;
    },
  },
});

export const { saveShippingAddress, applyCoupon } = checkoutSlice.actions;

export default checkoutSlice.reducer;
