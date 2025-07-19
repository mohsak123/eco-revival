// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import delegateSlice from './factory/factorySlice';
import materialsSlice from './factory/materialsSlice';
import pricingSlice from './factory/pricingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    delegate: delegateSlice,
    materials: materialsSlice,
    pricing: pricingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
