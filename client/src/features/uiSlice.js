// client/src/features/uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  const saved = localStorage.getItem('theme');
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: getInitialTheme(),
    sidebarOpen: false,
    searchOpen: false,
    notifications: [],
    recentlyViewed: JSON.parse(localStorage.getItem('recentlyViewed') || '[]'),
    wishlist: JSON.parse(localStorage.getItem('wishlist') || '[]'),
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
      document.documentElement.classList.toggle('dark', state.theme === 'dark');
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
      document.documentElement.classList.toggle('dark', action.payload === 'dark');
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },
    toggleSearch: (state) => {
      state.searchOpen = !state.searchOpen;
    },
    closeSearch: (state) => {
      state.searchOpen = false;
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
        timestamp: new Date().toISOString(),
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    addToRecentlyViewed: (state, action) => {
      const item = action.payload;
      state.recentlyViewed = state.recentlyViewed.filter(i => i._id !== item._id);
      state.recentlyViewed.unshift(item);
      state.recentlyViewed = state.recentlyViewed.slice(0, 10);
      localStorage.setItem('recentlyViewed', JSON.stringify(state.recentlyViewed));
    },
    clearRecentlyViewed: (state) => {
      state.recentlyViewed = [];
      localStorage.removeItem('recentlyViewed');
    },
    addToWishlist: (state, action) => {
      const item = action.payload;
      if (!state.wishlist.find(i => i._id === item._id)) {
        state.wishlist.push(item);
        localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(i => i._id !== action.payload);
      localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
    },
    clearWishlist: (state) => {
      state.wishlist = [];
      localStorage.removeItem('wishlist');
    },
  },
});

export const {
  toggleTheme,
  setTheme,
  toggleSidebar,
  closeSidebar,
  toggleSearch,
  closeSearch,
  addNotification,
  removeNotification,
  clearNotifications,
  addToRecentlyViewed,
  clearRecentlyViewed,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} = uiSlice.actions;

export default uiSlice.reducer;
