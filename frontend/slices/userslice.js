import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    value: localStorage.getItem("userdata")
      ? JSON.parse(localStorage.getItem("userdata"))
      : null,
  },
  reducers: {
    userLoginInfo: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { userLoginInfo } = authSlice.actions;

export default authSlice.reducer;
