// client/src/services/cartService.js
import api from './api';

export const cartService = {
  getCart: async () => {
    const response = await api.get('/cart');
    return response.data;
  },

  addToCart: async (productId, quantity = 1) => {
    const response = await api.post('/cart', { productId, quantity });
    return response.data;
  },

  updateCartItem: async (itemId, quantity) => {
    const response = await api.put(`/cart/${itemId}`, { quantity });
    return response.data;
  },

  removeFromCart: async (itemId) => {
    const response = await api.delete(`/cart/${itemId}`);
    return response.data;
  },

  saveForLater: async (itemId) => {
    const response = await api.put(`/cart/${itemId}/save-for-later`);
    return response.data;
  },

  moveToCart: async (itemId) => {
    const response = await api.put(`/cart/${itemId}/move-to-cart`);
    return response.data;
  },

  clearCart: async () => {
    const response = await api.delete('/cart');
    return response.data;
  },

  applyCoupon: async (code, subtotal) => {
    const response = await api.post('/coupons/apply', { code, subtotal });
    return response.data;
  },
};

export default cartService;
