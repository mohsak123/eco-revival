import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_API_URL;

// --- START: Correct & Complete Type Definitions ---

type OrderMaterialItem = {
  id: number;
  quantity: number;
  total_price: number;
  createdAt: string;
  updatedAt: string;
  material_id: number;
  order_id: number;
  pricing_id: number | null;
};

type MaterialInfo = {
  name: string;
  image: string;
};

type Pricing = {
  id: number;
  price: number;
  unit: string;
  bonus: number;
  createdAt: string;
  updatedAt: string;
  factory_id: number;
  material_id: number;
  Material: MaterialInfo;
};

type FactoryInfo = {
  id: number;
  name: string;
  Pricings: Pricing[];
};

export type OrderResponse = {
  id: number;
  order_date: string;
  required_date: string;
  shipped_date: string | null;
  status: string;
  comments: string | null;
  lng: string;
  lat: string;
  location: string;
  address: string;
  type: string;
  total_price: number;
  createdAt: string;
  updatedAt: string;
  delegate_id: number | null;
  factory_id: number;
  user_id: number;
  Order_Materials: OrderMaterialItem[];
  Factory: FactoryInfo;
};

// --- END: Correct & Complete Type Definitions ---


export type MaterialItem = {
  material_id: number;
  quantity: number;
};

export type OrderPayload = {
  required_date: string;
  comments: string;
  lng: number;
  lat: number;
  location: string;
  address: string;
  factory_id: number;
  materials: MaterialItem[];
};

type OrderState = {
  loadingOrder: boolean;
  error: string | null;
  success: boolean;
  data: any;
  ordersList: OrderResponse[];
  loadingOrders: boolean;
};

export const addOrder = createAsyncThunk(
  'order/addOrder',
  async (orderData: OrderPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/houdix/eco/order`, orderData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Unknown error');
    }
  }
);

export const getOrders = createAsyncThunk(
  'order/getOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<OrderResponse[]>(`${BASE_URL}/houdix/eco/user/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'ngrok-skip-browser-warning': "true",
        },
      });
      // ✅ Returns the direct array from the API
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

export const deleteOrder = createAsyncThunk(
  'order/deleteOrder',
  async (orderId: number, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/houdix/eco/order/${orderId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      toast.success('Order deleted successfully');
      return orderId; // أعد رقم الطلب لنقوم بحذفه من الحالة
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete order');
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ orderId, data }: { orderId: number; data: any }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${BASE_URL}/houdix/eco/order/${orderId}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success(response?.data?.message);
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "failed to edit the order");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);


const initialState: OrderState = {
  loadingOrder: false,
  error: null,
  success: false,
  data: null,
  ordersList: [],
  loadingOrders: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.loadingOrder = false;
      state.error = null;
      state.success = false;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add order
      .addCase(addOrder.pending, (state) => {
        state.loadingOrder = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.loadingOrder = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(addOrder.rejected, (state, action: PayloadAction<any>) => {
        state.loadingOrder = false;
        state.error = action.payload;
        state.success = false;
      })

      // Get orders
      .addCase(getOrders.pending, (state) => {
        state.loadingOrders = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action: PayloadAction<OrderResponse[]>) => {
        state.loadingOrders = false;
        state.ordersList = action.payload;
      })
      .addCase(getOrders.rejected, (state, action: PayloadAction<any>) => {
        state.loadingOrders = false;
        state.error = action.payload;
      })

      // ✅ Delete Order
      .addCase(deleteOrder.fulfilled, (state, action: PayloadAction<number>) => {
        // احذف الطلب من القائمة بدون الحاجة لإعادة تحميل الكل
        state.ordersList = state.ordersList.filter((order) => order.id !== action.payload);
      })

      // ✅ Update Order
      .addCase(updateOrder.fulfilled, (state, action: PayloadAction<OrderResponse>) => {
        const index = state.ordersList.findIndex((order) => order.id === action.payload.id);
        if (index !== -1) {
          // استبدل الطلب القديم بالطلب المحدث
          state.ordersList[index] = action.payload;
        }
      });
  },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;