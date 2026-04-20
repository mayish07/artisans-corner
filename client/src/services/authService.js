// client/src/services/authService.js
import api from './api';

export const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.put('/users/profile', profileData);
    return response.data;
  },

  changePassword: async (passwordData) => {
    const response = await api.post('/auth/change-password', passwordData);
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (resetToken, password) => {
    const response = await api.post(`/auth/reset-password/${resetToken}`, { password });
    return response.data;
  },

  becomeSeller: async (storeData) => {
    const response = await api.post('/users/become-seller', storeData);
    return response.data;
  },

  updateStoreProfile: async (storeData) => {
    const response = await api.put('/users/store', storeData);
    return response.data;
  },

  getVendorStore: async (storeSlug) => {
    const response = await api.get(`/users/store/${storeSlug}`);
    return response.data;
  },

  getAddresses: async () => {
    const response = await api.get('/users/addresses');
    return response.data;
  },

  addAddress: async (address) => {
    const response = await api.post('/users/addresses', address);
    return response.data;
  },

  updateAddress: async (addressId, address) => {
    const response = await api.put(`/users/addresses/${addressId}`, address);
    return response.data;
  },

  deleteAddress: async (addressId) => {
    const response = await api.delete(`/users/addresses/${addressId}`);
    return response.data;
  },
};

export default authService;
