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

// Отримати список автомобілів за фільтрами
export const fetchFilteredCars = createAsyncThunk(
  'filters/fetchFilteredCars',
  async ({
    page = 1,
    limit = 12,
    brand,
    rentalPrice,
    minMileage,
    maxMileage,
  }) => {
    const params = {
      page,
      limit,
      brand: brand || undefined,
      rentalPrice: rentalPrice || undefined,
      minMileage: minMileage || undefined,
      maxMileage: maxMileage || undefined,
    };

    const response = await axios.get('/cars', { params });
    return response.data;
  },
);
export const fetchCarById = createAsyncThunk(
  'cars/fetchCarById',
  async ({ carId }) => {
    const response = await axios.get(`/cars/${carId}`);
    return response.data;
  },
);
