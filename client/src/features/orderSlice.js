// client/src/features/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/orders`, orderData, {
        headers: getAuthHeader()
      });
      return response.data.data.order;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getMyOrders = createAsyncThunk(
  'orders/getMyOrders',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/orders/my`, {
        headers: getAuthHeader(),
        params
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getOrder = createAsyncThunk(
  'orders/getOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/orders/${orderId}`, {
        headers: getAuthHeader()
      });
      return response.data.data.order;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const cancelOrder = createAsyncThunk(
  'orders/cancelOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/orders/${orderId}/cancel`,
        {},
        { headers: getAuthHeader() }
      );
      return response.data.data.order;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getVendorOrders = createAsyncThunk(
  'orders/getVendorOrders',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/orders/vendor`, {
        headers: getAuthHeader(),
        params
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ orderId, orderStatus, trackingNumber }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/orders/${orderId}/status`,
        { orderStatus, trackingNumber },
        { headers: getAuthHeader() }
      );
      return response.data.data.order;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getVendorStats = createAsyncThunk(
  'orders/getVendorStats',
  async (period, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/orders/vendor/stats`, {
        headers: getAuthHeader(),
        params: { period }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createPaymentIntent = createAsyncThunk(
  'orders/createPaymentIntent',
  async ({ couponCode }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/payment/create-intent`,
        { couponCode },
        { headers: getAuthHeader() }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const confirmPayment = createAsyncThunk(
  'orders/confirmPayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/payment/confirm`,
        paymentData,
        { headers: getAuthHeader() }
      );
      return response.data.data.order;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    currentOrder: null,
    vendorOrders: [],
    vendorStats: null,
    paymentIntent: null,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalOrders: 0,
    },
    isLoading: false,
    error: null,
  },
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    clearPaymentIntent: (state) => {
      state.paymentIntent = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload.data.order;
        state.orders.unshift(action.payload.data.order);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Failed to create order';
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.orders = action.payload.data.orders;
        state.pagination = action.payload.data.pagination;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.currentOrder = action.payload.data.order;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex(o => o._id === action.payload.data.order._id);
        if (index !== -1) {
          state.orders[index] = action.payload.data.order;
        }
      })
      .addCase(getVendorOrders.fulfilled, (state, action) => {
        state.vendorOrders = action.payload.data.orders;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.vendorOrders.findIndex(o => o._id === action.payload.data.order._id);
        if (index !== -1) {
          state.vendorOrders[index] = action.payload.data.order;
        }
      })
      .addCase(getVendorStats.fulfilled, (state, action) => {
        state.vendorStats = action.payload.data;
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.paymentIntent = action.payload.data;
      })
      .addCase(confirmPayment.fulfilled, (state, action) => {
        state.currentOrder = action.payload.data.order;
        state.paymentIntent = null;
      });
  },
});

export const { clearCurrentOrder, clearPaymentIntent, clearError } = orderSlice.actions;
export default orderSlice.reducer;
