import APIService from "@/helper/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const api = new APIService();

export const getUsers = createAsyncThunk("user/getUser", async (params) => {
  const { pageSize, pageIndex, search } = params;
  const res = await api.getUsers(pageSize, pageIndex, search);
  return {
    result: res.data.result,
    params,
  };
});

export const getUser = createAsyncThunk("user/selectUser", async (id) => {
  if (id) {
    const res = await api.getUser(id);
    return res.data.result;
  } else {
    return null;
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    selectedUser: null,
    selectLoading: false,
    loading: false,
    totalDoc: 0,
    totalPage: 0,
    params: {
      pageSize: 10,
      pageIndex: 0,
      search: "",
    },
  },

  extraReducers: {
    [getUsers.pending]: (state, _) => {
      state.loading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.totalDoc = action.payload.result.totalDoc;
      state.totalPage = action.payload.result.totalPage;
      state.users = action.payload.result.users;
      state.params = action.payload.params;
    },
    [getUsers.rejected]: (state) => {
      state.loading = false;
      state.users = [];
    },
    [getUser.pending]: (state, _) => {
      state.selectLoading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.selectLoading = false;
      state.selectedUser = action.payload;
    },
    [getUser.rejected]: (state, action) => {
      state.selectLoading = false;
      state.selectedUser = null;
    },
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
