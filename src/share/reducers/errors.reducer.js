import { createSlice } from "@reduxjs/toolkit";

const initialState = "";
export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action) => {
      state = action.payload;
      return state;
    },
    clearErrors: (state) => {
      state = "";
      return state;
    },
  },
});

export const { setError, clearErrors } = errorSlice.actions;

export default errorSlice.reducer;
