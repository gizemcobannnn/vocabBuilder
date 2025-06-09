import { persistStore, persistReducer } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { wordsSlice } from './data/dataSlice';

const persistWordsConfig = {
    key:"persistedWords",
    storage,
    whitelist: ["words,favorites"]
}
const persistWordReducer = persistReducer(persistWordsConfig, wordsSlice.reducer);

export const store = configureStore({
    reducer: {
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