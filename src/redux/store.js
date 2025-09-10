// store.js
import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './cars/slice';
import filtersReducer from './filters/slice.js';

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    filters: filtersReducer,
  },
});
