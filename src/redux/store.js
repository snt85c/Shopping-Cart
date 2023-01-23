import { configureStore } from "@reduxjs/toolkit";
import { shopSlice} from "./slice";

export default configureStore({
  reducer: shopSlice,
});

