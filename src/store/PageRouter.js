import { createSlice } from "@reduxjs/toolkit";

export const pageRouterSlice = createSlice({
  name: "pageRouter",
  initialState: {
    state: null,
  },
  reducers: {
    SET_ROUTER: (state, action) => {
      state.state = action.payload.state
    },
    DELETE_ROUTER: (state) => {
      state.state = null;
    },
  },
});

export const { SET_ROUTER, DELETE_ROUTER } = pageRouterSlice.actions;

export default pageRouterSlice.reducer;