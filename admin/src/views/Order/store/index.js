import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    loading: false,
    selectedOrder: null,
    selectLoading: false,
    totalDoc: 0,
    totalPage: 0,
    params: {
      pageSize: 10,
      pageIndex: 1,
      search: "",
    },
  },
});
