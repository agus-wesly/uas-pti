import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, userId: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token, userId } = action.payload;
      state.user = user;
      state.token = token;
      state.userId = userId;
    },
    logout: (state, action) => {
      state.user = null;
      state.token = null;
      state.userId = null;
    },
  },
});

export const getToken = (state) => state.auth.token;
export const getUser = (state) => state.auth.user;
export const getUserId = (state) => state.auth.userId;

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
