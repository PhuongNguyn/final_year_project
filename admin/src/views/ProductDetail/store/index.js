import APIService from "@/helper/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const api = new APIService();

export const getLessons = createAsyncThunk(
    "lessons/getLesson",
    async (params) => {
        const { pageSize, pageIndex, search } = params;
        const res = await api.getCategories(pageSize, pageIndex, search);

        return { result: res.data.result, params };
    }
);

export const getLesson = createAsyncThunk(
    "lessons/getLesson",
    async (id) => {
        if (id) {
            const res = await api.getCategory(id);

            return res.data.result;
        } else {
            return null;
        }
    }
);

export const getAllLessons = createAsyncThunk("lessons/getAllLessons", async (state) => {
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


const lessonSlice = createSlice({
    name: "lessons",
    initialState: {
        allLessons: [],
        lessons: [],
        selectedLesson: null,
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
        [getAllLessons.fulfilled]: (state, action) => {
            state.allCategory = action.payload
        },
        [getAllLessons.rejected]: (state, _) => {
            state.allCategory = []
        },
        [getLessons.pending]: (state, _) => {
            state.loading = true;
        },
        [getLessons.fulfilled]: (state, action) => {
            state.loading = false;
            state.totalDoc = action.payload.result.totalDoc;
            state.totalPage = action.payload.result.totalPage;
            state.categories = action.payload.result.data;
            state.params = action.payload.params;
        },
        [getLessons.rejected]: (state) => {
            state.loading = false;
            state.categories = [];
        },
        [getLesson.pending]: (state, _) => {
            state.selectLoading = true;
        },
        [getLesson.fulfilled]: (state, action) => {
            state.selectLoading = false;
            state.selectedCategory = action.payload;
        },
        [getLesson.rejected]: (state) => {
            state.selectLoading = false;
            state.selectedCategory = null;
        },
    },
});

export const { } = lessonSlice.actions;

export default lessonSlice.reducer;
