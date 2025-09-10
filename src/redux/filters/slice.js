import { createSlice } from '@reduxjs/toolkit';
import { fetchBrands } from './operations';

const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    brands: [],
    filters: {
      brand: '',
      price: null,
      mileageFrom: null,
      mileageTo: null,
    },
  },
  reducers: {
    setFilter(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters(state) {
      state.filters = {
        brand: '',
        price: null,
        mileageFrom: null,
        mileageTo: null,
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
