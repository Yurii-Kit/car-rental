import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://car-rental-api.goit.global/';

export const fetchCars = createAsyncThunk(
  'cars/fetchAllCars',
  async ({ page = 1, limit = 12 } = {}) => {
    const response = await axios.get('/cars', { params: { page, limit } });
    return response.data;
  },
);

// export const fetchBrands = createAsyncThunk('cars/fetchBrands', async () => {
//   const response = await axios.get('/brands');
//   return response.data; // очікуємо масив брендів
// });

// Отримати список автомобілів за фільтрами
export const fetchFilteredCars = createAsyncThunk(
  'filters/fetchFilteredCars',
  async (filters) => {
    // filters = { brand, price, mileageFrom, mileageTo, page }
    const response = await axios.get('/cars', { params: filters });
    return response.data;
  },
);
