// import { createSlice } from "@reduxjs/toolkit";

// // 페이지네이션 페이지 유지를 위한 스토어
// export const paginationStoreSlice = createSlice({
//   name: "paginationStore",
//   initialState: {
//     presentPaging: 1,
//   },
//   reducers: {
//     SET_PAGING: (state, action) => {
//       state.presentPaging = action.payload.presentPaging;
//     },
//     INIT_PAGING: (state) => {
//       state.presentPaging = 1;
//     },
//   },
// });

// export const { SET_PAGING, INIT_PAGING } = paginationStoreSlice.actions;

// export default paginationStoreSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

// 페이지네이션 페이지 유지를 위한 스토어
export const paginationStoreSlice = createSlice({
  name: "paginationStore",
  initialState: {
    // 초기값이 있어야함 - dispatch 할때 매치가 되지 않으면 에러남. store의 변수를 가변으로 변경할 수 없음.
    // 게시글 페이지네이션
    boardlist: {
      name: "boardlist",
      item: 1,
    },
    // qna 페이지네이션
    qnalist: {
      name: "qnalist",
      item: 1,
    },
    studyroomlist: {
      name: "studyroomlist",
      item: 1,
    },
    // 마이페이지 - 스터디룸
    // 참여요청
    mystudyroom_request: {
      name: "mystudyroom_request",
      item: 1,
    },
    // 참여중
    mystudyroom_joined: {
      name: "mystudyroom_joined",
      item: 1,
    },
    // 유저정보
    userinfo: {
      name: "userinfo",
      item: 1,
    },
  },
  reducers: {
    SET_PAGING: (state, action) => {
      const { name, item } = action.payload;
      state[name].item = item;
    },
    INIT_PAGING: (state, action) => {
      const { name } = action.payload;
      state[name].item = 1;
    },
  },
});

export const { SET_PAGING, INIT_PAGING } = paginationStoreSlice.actions;

export default paginationStoreSlice.reducer;
