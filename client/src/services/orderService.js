// client/src/services/orderService.js
import api from './api';

export const orderService = {
  createOrder: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  getMyOrders: async (params = {}) => {
    const response = await api.get('/orders/my', { params });
    return response.data;
  },

  getOrder: async (orderId) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },

  cancelOrder: async (orderId) => {
    const response = await api.put(`/orders/${orderId}/cancel`);
    return response.data;
  },

  getVendorOrders: async (params = {}) => {
    const response = await api.get('/orders/vendor', { params });
    return response.data;
  },

  updateOrderStatus: async (orderId, statusData) => {
    const response = await api.put(`/orders/${orderId}/status`, statusData);
    return response.data;
  },

  getVendorStats: async (period = '30days') => {
    const response = await api.get('/orders/vendor/stats', { params: { period } });
    return response.data;
  },

  createPaymentIntent: async (couponCode) => {
    const response = await api.post('/payment/create-intent', { couponCode });
    return response.data;
  },

  confirmPayment: async (paymentData) => {
    const response = await api.post('/payment/confirm', paymentData);
    return response.data;
  },
};

export default orderService;
