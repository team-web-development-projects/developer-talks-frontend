import { createSlice } from "@reduxjs/toolkit";

// 라우터마다 다른 처리를 위한 스토어
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