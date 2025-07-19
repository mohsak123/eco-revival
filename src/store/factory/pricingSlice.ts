import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

interface Material {
  id: number;
  name: string;
  name_en: string;
  image: string;
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

interface PricingState {
  pricings: Pricing[];
  loading: boolean;
  error: string | null;
}

const initialState: PricingState = {
  pricings: [],
  loading: false,
  error: null,
};

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'ngrok-skip-browser-warning': 'true',
  },
});

export const getPricings = createAsyncThunk<Pricing[], void, { rejectValue: string }>(
  'pricing/getPricings',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<Pricing[]>(`${BASE_URL}/houdix/eco/factory/pricing`, getAuthHeaders());
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch pricings');
    }
  }
);

export const addPricing = createAsyncThunk<Pricing, Partial<Pricing>, { rejectValue: string }>(
  'pricing/addPricing',
  async (newPricing, thunkAPI) => {
    try {
      const response = await axios.post<Pricing>(`${BASE_URL}/houdix/eco/factory/pricing`, newPricing, getAuthHeaders());
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to add pricing');
    }
  }
);

export const deletePricing = createAsyncThunk<number, number, { rejectValue: string }>(
  'pricing/deletePricing',
  async (pricingId, thunkAPI) => {
    try {
      await axios.delete(`${BASE_URL}/houdix/eco/factory/pricing/${pricingId}`, getAuthHeaders());
      return pricingId;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to delete pricing');
    }
  }
);

export const editPricing = createAsyncThunk<Pricing, { id: number; data: Partial<Pricing> }, { rejectValue: string }>(
  'pricing/editPricing',
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await axios.put<Pricing>(`${BASE_URL}/houdix/eco/factory/pricing/${id}`, data, getAuthHeaders());
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to edit pricing');
    }
  }
);

const pricingSlice = createSlice({
  name: "pricing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPricings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPricings.fulfilled, (state, action) => {
        state.loading = false;
        state.pricings = action.payload;
      })
      .addCase(getPricings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load pricings';
      })
      .addCase(addPricing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPricing.fulfilled, (state, action) => {
        state.loading = false;
        state.pricings.push(action.payload);
      })
      .addCase(addPricing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add pricing';
      })
      .addCase(deletePricing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePricing.fulfilled, (state, action) => {
        state.loading = false;
        state.pricings = state.pricings.filter(p => p.id !== action.payload);
      })
      .addCase(deletePricing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete pricing';
      })
      .addCase(editPricing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPricing.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.pricings.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.pricings[index] = action.payload;
        }
      })
      .addCase(editPricing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to edit pricing';
      });
  }
});

export default pricingSlice.reducer;
