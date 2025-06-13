import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth.slice";
import {productSlice} from "./slices/adminProducts.slice"
import cartSlice from "./slices/cartSlice"
import messageSlice from "./slices/messageSlice"
import orderSlice from "./slices/orderSlice"
export const store=configureStore({
  reducer:{
    auth:authSlice.reducer,
    products:productSlice.reducer,
    card:cartSlice,
    message:messageSlice,
    orders:orderSlice
  }
})