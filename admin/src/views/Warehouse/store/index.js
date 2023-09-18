import APIService from "@/helper/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const api = new APIService();

export const getWarehouse = createAsyncThunk("warehouses/getWareHouse", async () => {

})

export const getPagingWarehouse = createAsyncThunk("warehouses/getPagingWarehouse", async (params) => {
  const { pageSize, pageIndex, search } = params;

  const result = await api.getPagingWarehouse(pageSize, pageIndex, search)

  return {
    result: result.data?.result,
    params
  }
})

export const createWarehouse = createAsyncThunk("warehouses/createWarehouse", async (data, { dispatch, getState }) => {
  const result = await api.createWarehouse(data)
  if (result.data?.status == 1) {
    dispatch(getPagingWarehouse(warehouseSlice.getInitialState().params))
    return result.data?.result
  }
})

export const updateWarehouse = createAsyncThunk("warehouses/editWarehouse", async ({ id, data }, { dispatch, getState }) => {
  const result = await api.editWarehouse(id, data)

  if (result.data?.status == 1) {
    console.log(getState())
    dispatch(getPagingWarehouse(getState().warehouses.params))
  }

  return result.data?.status
})

const warehouseSlice = createSlice({
  name: "warehouse",
  initialState: {
    warehouses: [],
    loading: false,
    selectedWarehouse: null,
    selectLoading: false,
    totalDoc: 0,
    totalPage: 0,
    params: {
      pageSize: 10,
      pageIndex: 1,
      search: "",
    },
  },
  reducers: {
    clearSelectedWarehouse: (state) => {
      state.selectedWarehouse = null
    },
    selectWarehouse: (state, action) => {
      state.selectedWarehouse = action.payload
    }
  },
  extraReducers: {
    [getWarehouse.fulfilled]: (state, _) => {

    },
    [getWarehouse.rejected]: (state, _) => {

    },
    [getPagingWarehouse.pending]: (state, _) => {
      state.loading = true
    },
    [getPagingWarehouse.fulfilled]: (state, action) => {
      state.warehouses = action.payload.result.data || []
      state.totalDoc = action.payload.result.totalDoc
      state.totalPage = action.payload.result.totalPage
      state.params = action.payload.params
      state.loading = false
    },
    [getPagingWarehouse.rejected]: (state, _) => {
      state.loading = false
    }
  }
});

export const { clearSelectedWarehouse, selectWarehouse } = warehouseSlice.actions;

export default warehouseSlice.reducer;
