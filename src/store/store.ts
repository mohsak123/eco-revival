// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import delegateSlice from './factory/factorySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    delegate:delegateSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
