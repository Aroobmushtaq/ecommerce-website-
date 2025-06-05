import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth.slice";
import {productSlice} from "./slices/adminProducts.slice"
export const store=configureStore({
  reducer:{
    auth:authSlice.reducer,
    products:productSlice.reducer
  }
})