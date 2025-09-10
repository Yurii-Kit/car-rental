import { createSlice } from '@reduxjs/toolkit';
import { fetchCars } from './operations';

const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    list: [], // список машин
    favorites: [], // обрані авто
    filters: {}, // стан фільтрів
    totalCars: null, // загальна кількість авто
    page: 1, // поточна сторінка
    totalPages: null, // всього сторінок
    isLoading: false,
    error: null,
  },
  reducers: {
    addFavorite(state, action) {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite(state, action) {
      state.favorites = state.favorites.filter((id) => id !== action.payload);
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

        const page = Number(action.payload.page);
        const totalPages = Number(action.payload.totalPages);
        const totalCars = Number(action.payload.totalCars);

        if (page === 1) {
          state.list = action.payload.cars;
        } else {
          state.list = [...state.list, ...action.payload.cars];
        }

        state.page = page;
        state.totalCars = totalCars;
        state.totalPages = totalPages;
      });
  },
});

export const { addFavorite, removeFavorite } = carsSlice.actions;

export default carsSlice.reducer;
