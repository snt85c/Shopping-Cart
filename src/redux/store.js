import { configureStore } from "@reduxjs/toolkit";
import { shopSlice} from "./slice";

export const store = configureStore({
  reducer: shopSlice,
});

