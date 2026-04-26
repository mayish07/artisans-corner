// client/src/features/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getCart = createAsyncThunk(
  'cart/getCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/cart`, {
        headers: getAuthHeader()
      });
      return response.data?.data || response.data || { items: [], subtotal: 0 };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/cart`,
        { productId, quantity },
        { headers: getAuthHeader() }
      );
      return response.data?.data || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/cart/${itemId}`,
        { quantity },
        { headers: getAuthHeader() }
      );
      return response.data?.data || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (itemId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/cart/${itemId}`, {
        headers: getAuthHeader()
      });
      return { ...(response.data?.data || response.data), removedItemId: itemId };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const saveForLater = createAsyncThunk(
  'cart/saveForLater',
  async (itemId, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/cart/${itemId}/save-for-later`,
        {},
        { headers: getAuthHeader() }
      );
      return response.data?.data || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const moveToCart = createAsyncThunk(
  'cart/moveToCart',
  async (itemId, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/cart/${itemId}/move-to-cart`,
        {},
        { headers: getAuthHeader() }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/cart`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    itemCount: 0,
    savedForLaterCount: 0,
    subtotal: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearCartState: (state) => {
      state.items = [];
      state.itemCount = 0;
      state.savedForLaterCount = 0;
      state.subtotal = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items || [];
        state.itemCount = action.payload.itemCount || 0;
        state.savedForLaterCount = action.payload.savedForLaterCount || 0;
        state.subtotal = action.payload.subtotal || 0;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Failed to load cart';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload.removedItemId);
        state.itemCount = state.items.filter(i => !i.savedForLater).length;
      })
      .addCase(saveForLater.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
      })
      .addCase(moveToCart.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
        state.itemCount = 0;
        state.savedForLaterCount = 0;
        state.subtotal = 0;
      });
  },
});

export const { clearCartState } = cartSlice.actions;
export default cartSlice.reducer;
