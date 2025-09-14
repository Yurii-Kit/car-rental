import { createSlice } from '@reduxjs/toolkit';
import { fetchBrands } from './operations';

const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    brands: [],
    filters: {
      brand: '',
      rentalPrice: null,
      minMileage: null,
      maxMileage: null,
    },
    isFiltered: false,
  },
  reducers: {
    setFilter(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      state.isFiltered =
        state.filters.brand !== '' ||
        state.filters.rentalPrice !== '' ||
        state.filters.minMileage !== '' ||
        state.filters.maxMileage !== '';
    },
    resetFilters(state) {
      state.filters = {
        brand: '',
        rentalPrice: null,
        minMileage: null,
        maxMileage: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBrands.fulfilled, (state, action) => {
      state.brands = action.payload;
    });
  },
});

export const { setFilter, resetFilters, setPage } = filterSlice.actions;
export default filterSlice.reducer;
