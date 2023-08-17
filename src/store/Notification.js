import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    noti: false,
    note: null
  },
  reducers: {
    ON_NOTI: (state, action) => {
      // state.noti = action.payload.noti;
      state.noti = true;
    },
    OFF_NOTI: (state, action) => {
      // state.noti = action.payload.noti;
      state.noti = false;
    },
    SUB_NOTE: (state, action) => {
      state.note = action.payload.note;
    },
  },
});

export const { ON_NOTI, OFF_NOTI, SUB_NOTE } = notificationSlice.actions;

export default notificationSlice.reducer;
