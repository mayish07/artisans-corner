import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import store from './app/store';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const WelcomePage = lazy(() => import('./pages/WelcomePage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));
const OrdersPage = lazy(() => import('./pages/OrdersPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const StoresPage = lazy(() => import('./pages/StoresPage'));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const ComparePage = lazy(() => import('./pages/ComparePage'));
const NotificationsPage = lazy(() => import('./pages/NotificationsPage'));
const MyReviewsPage = lazy(() => import('./pages/MyReviewsPage'));
const AddressesPage = lazy(() => import('./pages/AddressesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const SellerDashboard = lazy(() => import('./pages/SellerDashboard'));
const StorePage = lazy(() => import('./pages/StorePage'));
const BecomeSellerPage = lazy(() => import('./pages/BecomeSellerPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.3
};

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

function AnimatedPage({ children }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">
        <AnimatedPage>{children}</AnimatedPage>
      </main>
      <Footer />
    </div>
  );
}

function AuthLayout({ children }) {
  return (
    <AnimatedPage>{children}</AnimatedPage>
  );
}

function ScrollToTop() {
  const location = useLocation();
  useLocation;
  return null;
}

function AppRoutes() {
  const location = useLocation();
  const isAuthPage = ['/login', '/register', '/forgot-password', '/reset-password'].includes(location.pathname) || location.pathname.startsWith('/reset-');

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<Layout><HomePage /></Layout>} />
        <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
        <Route path="/register" element={<AuthLayout><RegisterPage /></AuthLayout>} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/shop" element={<Layout><ProductsPage /></Layout>} />
        <Route path="/products/:id" element={<Layout><ProductDetailPage /></Layout>} />
        <Route path="/categories" element={<Layout><CategoriesPage /></Layout>} />
        <Route path="/stores" element={<Layout><StoresPage /></Layout>} />
        <Route path="/stores/:id" element={<Layout><StorePage /></Layout>} />
        <Route path="/search" element={<Layout><SearchPage /></Layout>} />
        <Route path="/compare" element={<Layout><ComparePage /></Layout>} />
        <Route path="/cart" element={<Layout><CartPage /></Layout>} />
        <Route path="/checkout" element={<Layout><CheckoutPage /></Layout>} />
        <Route path="/wishlist" element={<Layout><WishlistPage /></Layout>} />
        <Route path="/orders" element={<Layout><OrdersPage /></Layout>} />
        <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
        <Route path="/notifications" element={<Layout><NotificationsPage /></Layout>} />
        <Route path="/reviews" element={<Layout><MyReviewsPage /></Layout>} />
        <Route path="/addresses" element={<Layout><AddressesPage /></Layout>} />
        <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        <Route path="/become-seller" element={<Layout><BecomeSellerPage /></Layout>} />
        <Route path="/dashboard/seller" element={<Layout><SellerDashboard /></Layout>} />
        <Route path="/dashboard/admin" element={<Layout><AdminDashboard /></Layout>} />
        <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner fullScreen />}>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}

export default App;