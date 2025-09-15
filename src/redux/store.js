// store.js
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

import carsReducer from './cars/slice';
import filtersReducer from './filters/slice.js';

const persistConfig = {
  key: 'favorites',
  storage,
  whitelist: ['favorites'],
};

const persistedCarsReducer = persistReducer(persistConfig, carsReducer);

export const store = configureStore({
  reducer: {
    cars: persistedCarsReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
