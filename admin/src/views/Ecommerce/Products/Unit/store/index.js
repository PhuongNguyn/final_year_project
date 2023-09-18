import APIService from "@/helper/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const api = new APIService();

export const getUnits = createAsyncThunk(
    "units/getUnits",
    async (params) => {
        const { pageSize, pageIndex, search } = params;
        const res = await api.getUnits(pageSize, pageIndex, search);

        return { result: res.data.result, params };
    }
);

export const getUnit = createAsyncThunk(
    "units/getUnit",
    async (id) => {
        const res = await api.getUnit(id);
        return res.data.result;
    }
);

export const getAllUnit = createAsyncThunk("/units/getAllUnit", async () => {
    const result = await api.getAllUnit()
    if (result.data?.status == 1) {
        return result.data?.result
    } else {
        return []
    }
})

const unitSlice = createSlice({
    name: "units",
    initialState: {
        allUnit: [],
        units: [],
        selectedUnit: null,
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
        clearSelectedUnit: (state) => {
            state.selectedUnit = null
        }
    },
    extraReducers: {
        [getAllUnit.fulfilled]: (state, action) => {
            state.allUnit = action.payload
        },
        [getAllUnit.rejected]: (state, _) => {
            state.allUnit = []
        },
        [getUnits.pending]: (state, _) => {
            state.loading = true;
        },
        [getUnits.fulfilled]: (state, action) => {
            state.loading = false;
            state.totalDoc = action.payload.result.totalDoc;
            state.totalPage = action.payload.result.totalPage;
            state.units = action.payload.result.data;
            state.params = action.payload.params;
        },
        [getUnits.rejected]: (state) => {
            state.loading = false;
            state.units = [];
        },
        [getUnit.pending]: (state, _) => {
            state.selectLoading = true;
        },
        [getUnit.fulfilled]: (state, action) => {
            state.selectLoading = false;
            state.selectedUnit = action.payload;
        },
        [getUnit.rejected]: (state) => {
            state.selectLoading = false;
            state.selectedUnit = null;
        },
    },
});

export const { clearSelectedUnit } = unitSlice.actions;

export default unitSlice.reducer;
