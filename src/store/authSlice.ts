// src/redux/authSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

// 🧾 أنواع البيانات
interface User {
  id: string;
  username: string;
  fullname: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  location?: string;
  lat?: number;
  lng?: number;
}


interface AuthState {
  user: User | null;
  token: string | null;
  role: 'user' | 'admin';
  loading: boolean;
  error: string | null;
}

interface LoginPayload {
  username: string;
  password: string;
  isCompany?: boolean;
}

interface RegisterPayload {
  username: string;
  fullname: string;
  password: string;
  email: string;
  phone: string;
  address?: string;
  location?: string;
  lat?: number;
  lng?: number;
}

interface CompanyRegisterPayload {
  username: string;
  password: string;
  email: string;
  phone: string;
  address: string;
  name: string;
  record: string;
  url: string;
  location?: string;
  lat?: number;
  lng?: number;
}


/* ----------- User Api ----------- */

// ⏳ login
export const loginUser = createAsyncThunk<
  { user: User; token: string },
  LoginPayload,
  { rejectValue: string }
>('auth/loginUser', async (data, thunkAPI) => {
  try {
    const response = await axios.post(`${BASE_URL}/houdix/eco/auth/user/login`, data);
    return response.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

// ⏳ register
export const registerUser = createAsyncThunk<
  { user: User; token: string },
  RegisterPayload,
  { rejectValue: string }
>('auth/registerUser', async (data, thunkAPI) => {
  try {
    const response = await axios.post(`${BASE_URL}/houdix/eco/auth/user/signup`, data);
    console.log(response.data)
    return response.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Register failed');
  }
});

// ⏳ getProfile
export const getProfile = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>('auth/getProfile', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${BASE_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Profile load failed');
  }
});

/* ----------- Company Api ----------- */

// ⏳ login Company
export const loginCompany = createAsyncThunk<
  { factory: User; token: string },
  LoginPayload,
  { rejectValue: string }
>("auth/loginCompany", async (data, thunkAPI) => {
  try {
    const response = await axios.post(`${BASE_URL}/houdix/eco/auth/factory/login`, data);
    return response.data
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});


export const registerCompany = createAsyncThunk<
  { factory: User; token: string },
  CompanyRegisterPayload,
  { rejectValue: string }
>('auth/registerCompany', async (data, thunkAPI) => {
  try {
    const response = await axios.post(`${BASE_URL}/houdix/eco/auth/factory/signup`, data);
    return response.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Register company failed');
  }
});



// 🧠 Slice
const initialState: AuthState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  token: localStorage.getItem('token'),
  role: localStorage.getItem('role') === 'admin' ? 'admin' : 'user',
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.role = 'user';
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
    },
    setRole(state, action) {
      state.role = action.payload;
      localStorage.setItem('role', action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })

      // register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Register failed';
      })

      // profile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Profile failed';
      })

      // Login Company
      .addCase(loginCompany.pending , (state) => {
        state.loading = true,
        state.error = null
      })
      .addCase(loginCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.factory;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.factory));
      })
      .addCase(loginCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed"
      })

            // registerCompany
      .addCase(registerCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerCompany.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Register company failed';
      })

  },
});

export const { logout, setRole } = authSlice.actions;
export default authSlice.reducer;