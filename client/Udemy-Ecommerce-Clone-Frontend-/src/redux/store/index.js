import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../slice/user.slice'
import themeSlice from '../slice/theme.slice'

export const store = configureStore({
    reducer: {
        users: userSlice,
        themes: themeSlice
    },
})
