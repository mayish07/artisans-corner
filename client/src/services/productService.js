// client/src/services/productService.js
import api from './api';

const MOCK_CATEGORIES = [
  { _id: '1', name: 'Pottery', slug: 'pottery', icon: '🏺', productCount: 120 },
  { _id: '2', name: 'Jewelry', slug: 'jewelry', icon: '💍', productCount: 85 },
  { _id: '3', name: 'Textiles', slug: 'textiles', icon: '🧵', productCount: 95 },
  { _id: '4', name: 'Woodwork', slug: 'woodwork', icon: '🪵', productCount: 65 },
  { _id: '5', name: 'Art', slug: 'art', icon: '🎨', productCount: 110 },
  { _id: '6', name: 'Candles', slug: 'candles', icon: '🕯️', productCount: 45 },
];

const MOCK_PRODUCTS = [
  { _id: '1', name: 'Handcrafted Ceramic Vase', slug: 'handcrafted-ceramic-vase', price: 89, images: ['https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400'], category: { name: 'Pottery' }, vendor: { storeName: 'Earth & Clay' }, rating: 4.8, reviewCount: 24 },
  { _id: '2', name: 'Silver Kundan Necklace', slug: 'silver-kundan-necklace', price: 450, images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400'], category: { name: 'Jewelry' }, vendor: { storeName: 'Heritage Jewelry' }, rating: 4.9, reviewCount: 56 },
  { _id: '3', name: 'Handwoven Silk Saree', slug: 'handwoven-silk-saree', price: 1200, images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400'], category: { name: 'Textiles' }, vendor: { storeName: 'Silk Road' }, rating: 4.7, reviewCount: 18 },
  { _id: '4', name: 'Carved Wooden Box', slug: 'carved-wooden-box', price: 250, images: ['https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400'], category: { name: 'Woodwork' }, vendor: { storeName: 'Wood Wonders' }, rating: 4.6, reviewCount: 32 },
  { _id: '5', name: 'Abstract Oil Painting', slug: 'abstract-oil-painting', price: 1800, images: ['https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=400'], category: { name: 'Art' }, vendor: { storeName: 'Canvas Studio' }, rating: 5.0, reviewCount: 8 },
  { _id: '6', name: 'Scented Soy Candle Set', slug: 'scented-soy-candle-set', price: 65, images: ['https://images.unsplash.com/photo-1602607434848-c1d2e3c2a299?w=400'], category: { name: 'Candles' }, vendor: { storeName: 'Flame & Wick' }, rating: 4.5, reviewCount: 67 },
  { _id: '7', name: 'Brass Diya Set', slug: 'brass-diya-set', price: 150, images: ['https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=400'], category: { name: 'Pottery' }, vendor: { storeName: 'Tradition Crafts' }, rating: 4.4, reviewCount: 41 },
  { _id: '8', name: 'Beaded Earrings', slug: 'beaded-earrings', price: 120, images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400'], category: { name: 'Jewelry' }, vendor: { storeName: 'Bead Works' }, rating: 4.7, reviewCount: 29 },
];

const MOCK_STORES = [
  { _id: '1', name: 'Earth & Clay', slug: 'earth-clay', description: 'Handcrafted pottery from local artisans', logo: '🏺', coverImage: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800', vendor: { name: 'Ravi Kumar' }, productCount: 45, rating: 4.8 },
  { _id: '2', name: 'Heritage Jewelry', slug: 'heritage-jewelry', description: 'Traditional Indian jewelry designs', logo: '💍', coverImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800', vendor: { name: 'Meera Shah' }, productCount: 32, rating: 4.9 },
  { _id: '3', name: 'Silk Road', slug: 'silk-road', description: 'Premium handwoven textiles', logo: '🧵', coverImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800', vendor: { name: 'Lakshmi Devi' }, productCount: 28, rating: 4.7 },
  { _id: '4', name: 'Wood Wonders', slug: 'wood-wonders', description: 'Intricate wooden handicrafts', logo: '🪵', coverImage: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800', vendor: { name: 'Suresh Patel' }, productCount: 38, rating: 4.6 },
];

export const productService = {
  getProducts: async (params = {}) => {
    try {
      const response = await api.get('/products', { params });
      return response.data;
    } catch (error) {
      return { success: true, data: { products: MOCK_PRODUCTS, total: MOCK_PRODUCTS.length, page: 1, pages: 1 } };
    }
  },

  getProduct: async (idOrSlug) => {
    try {
      const response = await api.get(`/products/${idOrSlug}`);
      return response.data;
    } catch (error) {
      const product = MOCK_PRODUCTS.find(p => p._id === idOrSlug || p.slug === idOrSlug);
      return { success: true, data: product || MOCK_PRODUCTS[0] };
    }
  },

  getFeaturedProducts: async () => {
    try {
      const response = await api.get('/products/featured');
      return response.data;
    } catch (error) {
      return { success: true, data: MOCK_PRODUCTS.slice(0, 4) };
    }
  },

  getCategories: async () => {
    try {
      const response = await api.get('/products/categories');
      return response.data;
    } catch (error) {
      return { success: true, data: MOCK_CATEGORIES };
    }
  },

  getStores: async () => {
    try {
      const response = await api.get('/stores');
      return response.data;
    } catch (error) {
      return { success: true, data: MOCK_STORES };
    }
  },

  searchProducts: async (query) => {
    try {
      const response = await api.get('/products', { params: { search: query } });
      return response.data;
    } catch (error) {
      const filtered = MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
      return { success: true, data: { products: filtered, total: filtered.length, page: 1, pages: 1 } };
    }
  },

  getMyProducts: async (params = {}) => {
    try {
      const response = await api.get('/products/vendor/my-products', { params });
      return response.data;
    } catch (error) {
      return { success: true, data: { products: [], total: 0 } };
    }
  },

  createProduct: async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  updateProduct: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  addToWishlist: async (productId) => {
    const response = await api.post(`/users/wishlist/${productId}`);
    return response.data;
  },

  removeFromWishlist: async (productId) => {
    const response = await api.delete(`/users/wishlist/${productId}`);
    return response.data;
  },
};

export default productService;
