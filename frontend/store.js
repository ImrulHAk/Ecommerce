import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/userslice";

export default configureStore({
  reducer: {
    authSlice: authSlice,
  },
});
