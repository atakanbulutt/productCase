import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../../modules/product/store/productSlice.ts";
import userSlice from "../../modules/user/store/userSlice.ts";

export const store = configureStore({
  reducer: {
    products: productSlice,
    users: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
