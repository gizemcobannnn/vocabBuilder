import { persistStore, persistReducer } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { wordsSlice } from './data/dataSlice';
import authReducer from './auth/authSlice'

const persistWordsConfig = {
    key:"persistedWords",
    storage,
    whitelist: ["words","favorites"]
}
const persistAuthConfig = {
  key:  "persistedAuth",
  storage,
  whitelist:["token"]
}

const persistWordReducer = persistReducer(persistWordsConfig, wordsSlice.reducer);
const persistAuthReducer = persistReducer(persistAuthConfig, authReducer)
export const store = configureStore({
    reducer: {
        auth: persistAuthReducer,
        words:persistWordReducer
    },
    middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);