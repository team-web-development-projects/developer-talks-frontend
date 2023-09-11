import { createSlice } from "@reduxjs/toolkit";

// 페이지네이션 페이지 유지를 위한 스토어
export const paginationStoreSlice = createSlice({
  name: "paginationStore",
  initialState: {
    presentPaging: 0,
  },
  reducers: {
    SET_PAGING: (state, action) => {
      state.presentPaging = action.payload.state;
    },
    INIT_PAGING: (state) => {
      state.presentPaging = 0;
    },
  },
});

export const { SET_PAGING, INIT_PAGING } = paginationStoreSlice.actions;

export default paginationStoreSlice.reducer;
