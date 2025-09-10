// selectors.js
import { createSelector } from '@reduxjs/toolkit';

// Безпечний селектор
export const selectCarsState = (state) =>
  state.cars || { list: [], favorites: [], filters: {} };

// Мемоізовані селектори
export const selectCarsList = createSelector(
  [selectCarsState],
  (carsState) => carsState.list || [],
);

export const selectFavorites = createSelector(
  [selectCarsState],
  (carsState) => carsState.favorites || [],
);

export const selectPageState = (state) => state.cars.page;

export const selectTotalPagesState = (state) => state.cars.totalPages;

export const selectIsLoadingState = (state) => state.cars.isLoading;
