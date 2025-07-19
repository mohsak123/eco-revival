import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

interface Delegate {
  id: number;
  fullname: string;
  number: string;
  lng: number;
  lat: number;
  location: string;
  address: string;
  factory_id: number;
  updatedAt: string;
  createdAt: string;
}

interface DataDelegateResponse {
  delegate: Delegate[];
}

interface DelegateState {
  delegate: Delegate[];
  loading: boolean;
  error: string | null;
}

interface EditDelegatePayload {
  id: number;
  data: Partial<Delegate>; // يمكن تمرير بعض أو كل الخصائص
}


const initialState: DelegateState = {
  delegate: [], // بدلاً من null
  loading: false,
  error: null,
};


export const getDelegates = createAsyncThunk<
  Delegate[],
  void,
  { rejectValue: string }
>(
  'delegate/getDelegates',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/houdix/eco/factory/delegate`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'ngrok-skip-browser-warning': true,
        },
      });

      console.log(response.data)

      return response.data as Delegate[];
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Delegates load failed');
    }
  }
);

export const createDelegate = createAsyncThunk<
  Delegate,
  Partial<Delegate>,
  { rejectValue: string }
>(
  'delegate/createDelegate',
  async (newDelegate, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/houdix/eco/factory/delegate`,
        newDelegate,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'ngrok-skip-browser-warning': true,
          },
        }
      );

      return response.data as Delegate;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Create delegate failed'
      );
    }
  }
);

export const editDelegate = createAsyncThunk<
  { message: string; delegate: Delegate },
  EditDelegatePayload,
  { rejectValue: string }
>(
  'delegate/editDelegate',
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/houdix/eco/factory/delegate/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'ngrok-skip-browser-warning': true,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to edit delegate'
      );
    }
  }
);

export const deleteDelegate = createAsyncThunk<
  number, // بنرجّع الـ ID المحذوف
  number, // بندخل الـ ID فقط
  { rejectValue: string }
>(
  'delegate/deleteDelegate',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${BASE_URL}/houdix/eco/factory/delegate/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'ngrok-skip-browser-warning': true,
        },
      });
      return id; // بنرجّع الـ ID حتى نحذف العنصر من الستيت
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to delete delegate'
      );
    }
  }
);


const delegateSlice = createSlice({
  name: 'delegate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDelegates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDelegates.fulfilled, (state, action) => {
        state.loading = false;
        state.delegate = action.payload;
      })
      .addCase(getDelegates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      })

      // 🔥 createDelegate
      .addCase(createDelegate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDelegate.fulfilled, (state, action) => {
        state.loading = false;
        state.delegate.push(action.payload); // أضفناه للمصفوفة الحالية
      })
      .addCase(createDelegate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      })

      .addCase(editDelegate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editDelegate.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.delegate; // 👈 خذ delegate من داخل الـ payload
        const index = state.delegate.findIndex(d => d.id === updated.id);
        if (index !== -1) {
          state.delegate[index] = updated;
        }
      })
      .addCase(editDelegate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      })

      .addCase(deleteDelegate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDelegate.fulfilled, (state, action) => {
        state.loading = false;
        state.delegate = state.delegate.filter(d => d.id !== action.payload);
      })
      .addCase(deleteDelegate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      })
  },
});

export const { } = delegateSlice.actions;
export default delegateSlice.reducer;