// client/src/features/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/products`, { params });
      // Handle both array and object response
      const data = response.data.data;
      return Array.isArray(data) ? data : data.products || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getProduct = createAsyncThunk(
  'products/getProduct',
  async (idOrSlug, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/products/${idOrSlug}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getFeaturedProducts = createAsyncThunk(
  'products/getFeaturedProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/products/featured`);
      // Handle both array and object response
      const data = response.data.data;
      return Array.isArray(data) ? data : data.products || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getCategories = createAsyncThunk(
  'products/getCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/products/categories`);
      // Handle both array and object response
      const data = response.data.data;
      return Array.isArray(data) ? data : data.categories || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/products`, {
        params: { search: searchQuery }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getMyProducts = createAsyncThunk(
  'products/getMyProducts',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/products/vendor/my-products`, {
        headers: getAuthHeader(),
        params
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/products`,
        productData,
        { headers: getAuthHeader() }
      );
      return response.data.data.product;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/products/${id}`,
        data,
        { headers: getAuthHeader() }
      );
      return response.data.data.product;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/products/${id}`, {
        headers: getAuthHeader()
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  'products/addToWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/users/wishlist/${productId}`,
        {},
        { headers: getAuthHeader() }
      );
      return { productId, wishlist: response.data.data.wishlist };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  'products/removeFromWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${API_URL}/users/wishlist/${productId}`,
        { headers: getAuthHeader() }
      );
      return { productId, wishlist: response.data.data.wishlist };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    currentProduct: null,
    relatedProducts: [],
    categories: [],
    featuredProducts: [],
    myProducts: [],
    wishlist: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalProducts: 0,
    },
    isLoading: false,
    error: null,
  },
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
      state.relatedProducts = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.data.products;
        state.pagination = action.payload.data.pagination;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Failed to load products';
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.currentProduct = action.payload.data.product;
        state.relatedProducts = action.payload.data.relatedProducts;
      })
      .addCase(getFeaturedProducts.fulfilled, (state, action) => {
        state.featuredProducts = action.payload.data.products;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload.data.categories;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.items = action.payload.data.products;
        state.pagination = action.payload.data.pagination;
      })
      .addCase(getMyProducts.fulfilled, (state, action) => {
        state.myProducts = action.payload.data.products;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.myProducts.unshift(action.payload.data.product);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.myProducts.findIndex(p => p._id === action.payload.data.product._id);
        if (index !== -1) {
          state.myProducts[index] = action.payload.data.product;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.myProducts = state.myProducts.filter(p => p._id !== action.payload);
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload.wishlist;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload.wishlist;
      });
  },
});

export const { clearCurrentProduct, clearError } = productSlice.actions;
export default productSlice.reducer;
