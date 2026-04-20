import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from './features/authSlice';
import { getCart } from './features/cartSlice';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Toast from './components/Toast';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SellerDashboard from './pages/SellerDashboard';
import BecomeSellerPage from './pages/BecomeSellerPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import WishlistPage from './pages/WishlistPage';
import StorePage from './pages/StorePage';
import ManageProducts from './pages/dashboard/ManageProducts';
import AddEditProduct from './pages/dashboard/AddEditProduct';
import SellerOrders from './pages/dashboard/SellerOrders';
import StoreSettings from './pages/dashboard/StoreSettings';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      dispatch(getMe()).finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCart());
    }
  }, [isAuthenticated, dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-background text-gray-900">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/categories" element={<ProductsPage />} />
            <Route path="/product/:slug" element={<ProductDetailPage />} />
            <Route path="/store/:slug" element={<StorePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/become-seller"
              element={
                <ProtectedRoute>
                  <BecomeSellerPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <WishlistPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/dashboard/seller"
              element={
                <ProtectedRoute requiredRole="vendor">
                  <SellerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/seller/products"
              element={
                <ProtectedRoute requiredRole="vendor">
                  <ManageProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/seller/products/new"
              element={
                <ProtectedRoute requiredRole="vendor">
                  <AddEditProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/seller/products/:id/edit"
              element={
                <ProtectedRoute requiredRole="vendor">
                  <AddEditProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/seller/orders"
              element={
                <ProtectedRoute requiredRole="vendor">
                  <SellerOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/seller/settings"
              element={
                <ProtectedRoute requiredRole="vendor">
                  <StoreSettings />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/dashboard/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
        <Toast />
      </div>
    </BrowserRouter>
  );
}

export default App;
