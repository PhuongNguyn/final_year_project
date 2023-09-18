import APIService from "@/helper/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const api = new APIService();

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (params) => {
    const { pageSize, pageIndex, search } = params;
    const res = await api.getCategories(pageSize, pageIndex, search);

    return { result: res.data.result, params };
  }
);

export const getCategory = createAsyncThunk(
  "categories/getCategory",
  async (id) => {
    if (id) {
      const res = await api.getCategory(id);

      return res.data.result;
    } else {
      return null;
    }
  }
);

export const getAllCategory = createAsyncThunk("category/getAllCategory", async (state) => {
  try {
    const result = await api.getAllCategory()
    if (result.data?.status == 1) {
      return result.data?.result
    } else {
      return []
    }
  } catch (error) {
    console.log(error)
    state.allCategory = []
  }
})


const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    allCategory: [],
    categories: [],
    selectedCategory: null,
    loading: false,
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
  },
  extraReducers: {
    [getAllCategory.fulfilled]: (state, action) => {
      state.allCategory = action.payload
    },
    [getAllCategory.rejected]: (state, _) => {
      state.allCategory = []
    },
    [getCategories.pending]: (state, _) => {
      state.loading = true;
    },
    [getCategories.fulfilled]: (state, action) => {
      state.loading = false;
      state.totalDoc = action.payload.result.totalDoc;
      state.totalPage = action.payload.result.totalPage;
      state.categories = action.payload.result.data;
      state.params = action.payload.params;
    },
    [getCategories.rejected]: (state) => {
      state.loading = false;
      state.categories = [];
    },
    [getCategory.pending]: (state, _) => {
      state.selectLoading = true;
    },
    [getCategory.fulfilled]: (state, action) => {
      state.selectLoading = false;
      state.selectedCategory = action.payload;
    },
    [getCategory.rejected]: (state) => {
      state.selectLoading = false;
      state.selectedCategory = null;
    },
  },
});

export const { } = categoriesSlice.actions;

export default categoriesSlice.reducer;
