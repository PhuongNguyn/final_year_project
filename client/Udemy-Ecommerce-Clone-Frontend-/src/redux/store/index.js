import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../slice/user.slice'
import themeSlice from '../slice/theme.slice'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartSlice from '../slice/cart.slice';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, cartSlice)



export const store = configureStore({
    reducer: {
        users: userSlice,
        themes: themeSlice,
        persistedReducer
    },
})

export const persistor = persistStore(store)