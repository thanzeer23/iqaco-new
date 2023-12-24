import { createSlice } from "@reduxjs/toolkit";

export const changeState = createSlice({
  name: "settings",
  initialState: {
    sidebarShow: true,
    theme: "light",
  },
  reducers: {
    setHeader: (state, action) => {
      state.sidebarShow = action.payload;
      state.theme = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setHeader } = changeState.actions;

export default changeState.reducer;
