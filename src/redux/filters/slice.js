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

    totalCars: null,
    page: 1,
    totalPages: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setFilter(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1; // скидаємо сторінку при зміні фільтра
    },
    resetFilters(state) {
      state.filters = {
        brand: '',
        price: null,
        mileageFrom: null,
        mileageTo: null,
      };
      state.page = 1;
    },
    // setPage(state, action) {
    //   state.page = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBrands.fulfilled, (state, action) => {
      state.brands = action.payload;
    });
    // .addCase(fetchFilteredCars.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(fetchFilteredCars.fulfilled, (state, action) => {
    //   state.filteredCars = action.payload.items;
    //   state.totalPages = action.payload.totalPages;
    //   state.isLoading = false;
    // })
    // .addCase(fetchFilteredCars.rejected, (state, action) => {
    //   state.error = action.error.message;
    //   state.isLoading = false;
    // });
  },
});

export const { setFilter, resetFilters, setPage } = filterSlice.actions;
export default filterSlice.reducer;
