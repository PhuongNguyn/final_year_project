import APIService from "@/helper/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const api = new APIService();

export const getProducts = createAsyncThunk(
    "products/getProducts",
    async (params) => {
        const { pageSize, pageIndex, search } = params;
        const res = await api.getCategories(pageSize, pageIndex, search);

        return { result: res.data.result, params };
    }
);

export const getProduct = createAsyncThunk(
    "products/getProduct",
    async (id) => {
        if (id) {
            const res = await api.getCategory(id);

            return res.data.result;
        } else {
            return null;
        }
    }
);

export const getAllProduct = createAsyncThunk("product/getAllProduct", async (state) => {
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


const productSlice = createSlice({
    name: "products",
    initialState: {
        allProducts: [],
        products: [],
        selectedProduct: null,
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
        [getAllProduct.fulfilled]: (state, action) => {
            state.allCategory = action.payload
        },
        [getAllProduct.rejected]: (state, _) => {
            state.allCategory = []
        },
        [getProducts.pending]: (state, _) => {
            state.loading = true;
        },
        [getProducts.fulfilled]: (state, action) => {
            state.loading = false;
            state.totalDoc = action.payload.result.totalDoc;
            state.totalPage = action.payload.result.totalPage;
            state.categories = action.payload.result.data;
            state.params = action.payload.params;
        },
        [getProducts.rejected]: (state) => {
            state.loading = false;
            state.categories = [];
        },
        [getProduct.pending]: (state, _) => {
            state.selectLoading = true;
        },
        [getProduct.fulfilled]: (state, action) => {
            state.selectLoading = false;
            state.selectedCategory = action.payload;
        },
        [getProduct.rejected]: (state) => {
            state.selectLoading = false;
            state.selectedCategory = null;
        },
    },
});

export const { } = productSlice.actions;

export default productSlice.reducer;
