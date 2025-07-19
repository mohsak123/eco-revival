import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

interface Material {
  id: number;
  name: string;
  name_en: string;
  image: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

interface MaterialsState {
  materials: Material[];
  loading: boolean;
  error: string | null;
}

const initialState: MaterialsState = {
  materials: [],
  loading: false,
  error: null,
};

export const getMaterials = createAsyncThunk<Material[], void, { rejectValue: string }>(
  'materials/getMaterials',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<Material[]>(`${BASE_URL}/houdix/eco/material`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'ngrok-skip-browser-warning': true,
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue('Failed to fetch materials');
    }
  }
);

const materialsSlice = createSlice({
  name: "materials",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMaterials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMaterials.fulfilled, (state, action) => {
        state.loading = false;
        state.materials = action.payload;
      })
      .addCase(getMaterials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load materials';
      });
  }
});

export default materialsSlice.reducer;
