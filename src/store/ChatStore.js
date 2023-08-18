import { createSlice } from "@reduxjs/toolkit";

export const chatStoreSlice = createSlice({
  name: "chatStore",
  initialState: {
    data: [{}],
  },
  reducers: {
    SEND_MESSAGE: (state, action) => {
      state.data.push(action.payload);
    },
    INIT_MESSAGE: (state, action) => {
      state.data = [{}];
    },
  },
});

export const { SEND_MESSAGE, INIT_MESSAGE } = chatStoreSlice.actions;

export default chatStoreSlice.reducer;
