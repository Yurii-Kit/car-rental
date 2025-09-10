import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Отримати список брендів з бекенду
export const fetchBrands = createAsyncThunk('filters/fetchBrands', async () => {
  const response = await axios.get('/brands');
  return response.data;
});
