import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  description: "",
  email: "",
  nickname: "",
  registrationId: "",
  skills: [],
  userid: "",
};

export const userSlice = createSlice({
  name: "userStore",
  initialState,
  reducers: {
    SET_USER_INFO: (state, action) => {
      state.nickname = action.payload.nickname;
    },
    INIT_STATE: (state) => {
      return initialState;
    },
  },
});

export const { SET_USER_INFO, INIT_STATE } = userSlice.actions;

export default userSlice.reducer;
