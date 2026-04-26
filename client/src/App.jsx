// client/src/App.jsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CompareProvider } from './context/CompareContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Toast from './components/Toast';
import BackToTop from './components/BackToTop';
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
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AddressesPage from './pages/AddressesPage';
import MyReviewsPage from './pages/MyReviewsPage';
import NotificationsPage from './pages/NotificationsPage';
import NotFoundPage from './pages/NotFoundPage';
import ComparePage from './pages/ComparePage';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import StorePage from './pages/StorePage';
import CategoriesPage from './pages/CategoriesPage';
import StoresPage from './pages/StoresPage';
import SearchPage from './pages/SearchPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

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

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/forgot-password' || location.pathname.startsWith('/reset-password') || location.pathname.startsWith('/verify-email');

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
              <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
              <Route path="/become-seller" element={<ProtectedRoute><BecomeSellerPage /></ProtectedRoute>} />
              <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
              <Route path="/orders/:id" element={<ProtectedRoute><OrderDetailPage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
              <Route path="/addresses" element={<ProtectedRoute><AddressesPage /></ProtectedRoute>} />
              <Route path="/my-reviews" element={<ProtectedRoute><MyReviewsPage /></ProtectedRoute>} />
              <Route path="/dashboard/seller" element={<ProtectedRoute requiredRole="vendor"><SellerDashboard /></ProtectedRoute>} />
              <Route path="/dashboard/seller/products" element={<ProtectedRoute requiredRole="vendor"><ManageProducts /></ProtectedRoute>} />
              <Route path="/dashboard/seller/products/new" element={<ProtectedRoute requiredRole="vendor"><AddEditProduct /></ProtectedRoute>} />
              <Route path="/dashboard/seller/products/:id/edit" element={<ProtectedRoute requiredRole="vendor"><AddEditProduct /></ProtectedRoute>} />
              <Route path="/dashboard/seller/orders" element={<ProtectedRoute requiredRole="vendor"><SellerOrders /></ProtectedRoute>} />
              <Route path="/dashboard/seller/analytics" element={<ProtectedRoute requiredRole="vendor"><VendorAnalytics /></ProtectedRoute>} />
              <Route path="/dashboard/seller/payouts" element={<ProtectedRoute requiredRole="vendor"><VendorPayouts /></ProtectedRoute>} />
              <Route path="/dashboard/seller/messages" element={<ProtectedRoute requiredRole="vendor"><VendorMessages /></ProtectedRoute>} />
              <Route path="/dashboard/seller/settings" element={<ProtectedRoute requiredRole="vendor"><StoreSettings /></ProtectedRoute>} />
              <Route path="/dashboard/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
              <Route path="/dashboard/admin/users" element={<ProtectedRoute requiredRole="admin"><AdminUsers /></ProtectedRoute>} />
              <Route path="/dashboard/admin/stores" element={<ProtectedRoute requiredRole="admin"><AdminStores /></ProtectedRoute>} />
              <Route path="/dashboard/admin/products" element={<ProtectedRoute requiredRole="admin"><AdminProducts /></ProtectedRoute>} />
              <Route path="/dashboard/admin/categories" element={<ProtectedRoute requiredRole="admin"><AdminCategories /></ProtectedRoute>} />
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