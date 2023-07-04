import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    noti: null,
    note: null
  },
  reducers: {
    SUB_NOTI: (state, action) => {
      state.noti = action.payload.noti;
    },
    SUB_NOTE: (state, action) => {
      state.note = action.payload.note;
    },
  },
});

export const { SUB_NOTI, SUB_NOTE } = notificationSlice.actions;

export default notificationSlice.reducer;
