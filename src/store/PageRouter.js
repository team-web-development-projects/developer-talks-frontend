import { createSlice } from "@reduxjs/toolkit";

export const pageRouterSlice = createSlice({
  name: "pageRouter",
  initialState: {
    state: null,
    paging: 1,
    page: null
  },
  reducers: {
    SET_ROUTER: (state, action) => {
      state.state = action.payload.state
    },
    TAB_ROUTER: (state, action) => {
      state.state = action.payload.state
    },
    DELETE_ROUTER: (state) => {
      state.state = null;
    },
  },
});

export const { SET_ROUTER, DELETE_ROUTER, TAB_ROUTER } = pageRouterSlice.actions;

export default pageRouterSlice.reducer;