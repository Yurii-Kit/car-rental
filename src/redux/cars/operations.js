import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://car-rental-api.goit.global/';

export const fetchCars = createAsyncThunk(
  'cars/fetchAllCars',
  async ({ page = 1 } = {}) => {
    const response = await axios.get('/cars', { params: { page } });
    return response.data;
  },
);
