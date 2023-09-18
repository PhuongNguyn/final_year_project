import { createSlice } from "@reduxjs/toolkit";

const initialUser = () => {
  const item = window.localStorage.getItem("userData");

  return item ? JSON.parse(item) : null;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: initialUser(),
    permission: null,
  },
  reducers: {
    handleLogin: (state, action) => {
      state.authUser = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.permission = action.payload.permission;
      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...action.payload.user,
          permission: action.payload.permission,
        })
      );
      localStorage.setItem(
        "accessToken",
        JSON.stringify(action.payload.accessToken)
      );
    },
    handleLogout: (state) => {
      state.authUser = null;
      state.accessToken = null;
      state.permission = null;
    },
  },
});

export const { handleLogin, handleLogout } = authSlice.actions;

export default authSlice.reducer;
