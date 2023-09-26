import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeLoadingState: (state, action) => {
            state.loading = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { changeLoadingState } = themeSlice.actions

export default themeSlice.reducer