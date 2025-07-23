import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

interface Material {
  id: number;
  name: string;
  image: string;
  notes: string;
}

interface Pricing {
  id: number;
  price: number;
  unit: string;
  bonus: number;
  createdAt: string;
  updatedAt: string;
  factory_id: number;
  material_id: number;
  Material: Material;
}

interface Factory {
  id: number;
  username: string;
  name: string;
  password: string;
  state: string;
  city: string;
  email: string;
  phone: string;
  url: string;
  record: string;
  active: boolean;
  lat: string;
  lng: string;
  location: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  Pricings: Pricing[];
}

interface FactoryState {
  factory: Factory[];
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}


const initialState:FactoryState = {
  factory: [],
  loading: false,
  error: null,
  status: "idle", // ✅ الحالة الأولية
}

export const getFactories = createAsyncThunk<Factory[], void, { rejectValue: string }>(
  'factory/getFactories',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<Factory[]>(`${BASE_URL}/houdix/eco/factory/with-pricings`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'ngrok-skip-browser-warning': true,
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue('Failed to fetch factories');
    }
  }
);


const factorySlice = createSlice({
  name: 'factory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFactories.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(getFactories.fulfilled, (state, action) => {
        state.loading = false;
        state.factory = action.payload;
        state.status = "succeeded";
      })
      .addCase(getFactories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
        state.status = "failed";
      });
  }
});


export default factorySlice.reducer;