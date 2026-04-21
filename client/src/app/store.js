import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../features/authSlice';
import cartReducer from '../features/cartSlice';
import productReducer from '../features/productSlice';
import orderReducer from '../features/orderSlice';
import uiReducer from '../features/uiSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, (state, action) => {
  const combinedReducer = {
    auth: authReducer,
    cart: cartReducer,
    products: productReducer,
    orders: orderReducer,
    ui: uiReducer,
  };
  
  if (action.type.startsWith('auth/')) {
    return { ...state, auth: authReducer(state.auth, action) };
  }
  
  return combinedReducer;
});

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: persistReducer(
      {
        key: 'cart',
        version: 1,
        storage,
      },
      cartReducer
    ),
    products: productReducer,
    orders: orderReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export default store;
