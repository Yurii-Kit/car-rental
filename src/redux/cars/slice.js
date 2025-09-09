import { createSlice } from '@reduxjs/toolkit';
import { fetchCars } from './operations';

const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    list: [], // список машин
    favorites: [], // обрані авто
    filters: {}, // стан фільтрів
    isLoading: false,
    error: null,
  },
  reducers: {
    setFilters(state, action) {
      state.filters = action.payload;
      state.list = []; // Скидаємо попередні результати перед новим пошуком
    },
    addFavorite(state, action) {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite(state, action) {
      state.favorites = state.favorites.filter((id) => id !== action.payload);
    },
    clearFavorites(state) {
      state.favorites = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload.cars;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, addFavorite, removeFavorite, clearFavorites } =
  carsSlice.actions;

export default carsSlice.reducer;
