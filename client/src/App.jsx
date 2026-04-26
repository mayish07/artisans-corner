import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from './features/authSlice';
import { getCart } from './features/cartSlice';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Toast from './components/Toast';
import BackToTop from './components/BackToTop';
import { ErrorBoundary } from './components/ErrorBoundary';
import { CompareProvider } from './context/CompareContext';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import SellerDashboard from './pages/SellerDashboard';
import BecomeSellerPage from './pages/BecomeSellerPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import WishlistPage from './pages/WishlistPage';
import StorePage from './pages/StorePage';
import CategoriesPage from './pages/CategoriesPage';
import StoresPage from './pages/StoresPage';
import SearchPage from './pages/SearchPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AddressesPage from './pages/AddressesPage';
import MyReviewsPage from './pages/MyReviewsPage';
import NotificationsPage from './pages/NotificationsPage';
import NotFoundPage from './pages/NotFoundPage';
import ComparePage from './pages/ComparePage';

import ManageProducts from './pages/dashboard/ManageProducts';
import AddEditProduct from './pages/dashboard/AddEditProduct';
import SellerOrders from './pages/dashboard/SellerOrders';
import StoreSettings from './pages/dashboard/StoreSettings';
import VendorAnalytics from './pages/dashboard/VendorAnalytics';
import VendorPayouts from './pages/dashboard/VendorPayouts';
import VendorMessages from './pages/dashboard/VendorMessages';

import AdminUsers from './pages/admin/AdminUsers';
import AdminStores from './pages/admin/AdminStores';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCategories from './pages/admin/AdminCategories';
import WelcomePage from './pages/WelcomePage';

// Splash Screen Component
function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [onComplete]);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-amber-900 via-orange-900 to-amber-800">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zm0-30V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>
      
      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative z-10 text-center px-4">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500" style={{ fontFamily: 'Orbitron, monospace' }}>
            ARTISAN'S
          </h1>
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500" style={{ fontFamily: 'Orbitron, monospace' }}>
            CORNER
          </h1>
          <p className="text-amber-300 mt-3 tracking-widest uppercase text-sm">Multi-Vendor Handmade Goods</p>
        </div>
        
        {/* Loading Ring */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-amber-500/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-orange-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
        
        {/* Progress Bar */}
        <div className="max-w-xs mx-auto">
          <div className="h-1 bg-amber-500/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <p className="text-amber-200/60 text-sm mt-4">
            {progress < 30 && 'Initializing...'}
            {progress >= 30 && progress < 60 && 'Loading marketplace...'}
            {progress >= 60 && progress < 90 && 'Connecting...'}
            {progress >= 90 && 'Welcome to Artisan\'s Corner'}
          </p>
        </div>
      </div>
    </div>
  );
}

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const location = useLocation();

  const isAuthPage = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/forgot-password' || location.pathname.startsWith('/reset-password') || location.pathname.startsWith('/verify-email');

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

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <CompareProvider>
        <div className="min-h-screen flex flex-col bg-[#FFFBF5] text-stone-900">
          {!isAuthPage && <Navbar />}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/home" element={<WelcomePage />} />
              <Route path="/shop" element={<ProductsPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/categories/:slug" element={<ProductsPage />} />
              <Route path="/product/:slug" element={<ProductDetailPage />} />
              <Route path="/stores" element={<StoresPage />} />
              <Route path="/store/:slug" element={<StorePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/compare" element={<ComparePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
            <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            
            <Route path="/checkout" element={
              <ProtectedRoute><CheckoutPage /></ProtectedRoute>
            } />
            <Route path="/become-seller" element={
              <ProtectedRoute><BecomeSellerPage /></ProtectedRoute>
            } />
            <Route path="/notifications" element={
              <ProtectedRoute><NotificationsPage /></ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute><OrdersPage /></ProtectedRoute>
            } />
            <Route path="/orders/:id" element={
              <ProtectedRoute><OrderDetailPage /></ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute><ProfilePage /></ProtectedRoute>
            } />
            <Route path="/wishlist" element={
              <ProtectedRoute><WishlistPage /></ProtectedRoute>
            } />
            <Route path="/addresses" element={
              <ProtectedRoute><AddressesPage /></ProtectedRoute>
            } />
            <Route path="/my-reviews" element={
              <ProtectedRoute><MyReviewsPage /></ProtectedRoute>
            } />
            
            <Route path="/dashboard/seller" element={
              <ProtectedRoute requiredRole="vendor"><SellerDashboard /></ProtectedRoute>
            } />
            <Route path="/dashboard/seller/products" element={
              <ProtectedRoute requiredRole="vendor"><ManageProducts /></ProtectedRoute>
            } />
            <Route path="/dashboard/seller/products/new" element={
              <ProtectedRoute requiredRole="vendor"><AddEditProduct /></ProtectedRoute>
            } />
            <Route path="/dashboard/seller/products/:id/edit" element={
              <ProtectedRoute requiredRole="vendor"><AddEditProduct /></ProtectedRoute>
            } />
            <Route path="/dashboard/seller/orders" element={
              <ProtectedRoute requiredRole="vendor"><SellerOrders /></ProtectedRoute>
            } />
            <Route path="/dashboard/seller/analytics" element={
              <ProtectedRoute requiredRole="vendor"><VendorAnalytics /></ProtectedRoute>
            } />
            <Route path="/dashboard/seller/payouts" element={
              <ProtectedRoute requiredRole="vendor"><VendorPayouts /></ProtectedRoute>
            } />
            <Route path="/dashboard/seller/messages" element={
              <ProtectedRoute requiredRole="vendor"><VendorMessages /></ProtectedRoute>
            } />
            <Route path="/dashboard/seller/settings" element={
              <ProtectedRoute requiredRole="vendor"><StoreSettings /></ProtectedRoute>
            } />
            
            <Route path="/dashboard/admin" element={
              <ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>
            } />
            <Route path="/dashboard/admin/users" element={
              <ProtectedRoute requiredRole="admin"><AdminUsers /></ProtectedRoute>
            } />
            <Route path="/dashboard/admin/stores" element={
              <ProtectedRoute requiredRole="admin"><AdminStores /></ProtectedRoute>
            } />
            <Route path="/dashboard/admin/products" element={
              <ProtectedRoute requiredRole="admin"><AdminProducts /></ProtectedRoute>
            } />
            <Route path="/dashboard/admin/categories" element={
              <ProtectedRoute requiredRole="admin"><AdminCategories /></ProtectedRoute>
            } />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        {!isAuthPage && <Footer />}
        {!isAuthPage && <Toast />}
        {!isAuthPage && <BackToTop />}
      </div>
      </CompareProvider>
    </BrowserRouter>
  );
}

export default App;