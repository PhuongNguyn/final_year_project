import { createSlice } from '@reduxjs/toolkit'
import { removeTokenFromLocalStorage, removeUserFromLocalStorage, saveTokenToLocalStorage, saveUserToLocalStorage } from '../../utils'

const initialState = {
    user: null,
    permission: null,
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user
            saveTokenToLocalStorage(action.payload.token)
            saveUserToLocalStorage(action.payload.user)
        },
        logout: (state, _) => {
            state.user = null
            removeTokenFromLocalStorage()
            removeUserFromLocalStorage()
        }
    },
})

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions

export default userSlice.reducer