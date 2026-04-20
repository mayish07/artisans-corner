// client/src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';
import { getCart } from '../features/cartSlice';
import { useEffect, useState } from 'react';
import { Sun, Moon, Bell, Search } from 'lucide-react';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { itemCount } = useSelector((state) => state.cart);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCart());
    }
  }, [isAuthenticated, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="bg-white dark:bg-stone-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">🧵</span>
            <span className="font-serif text-xl text-amber-700 dark:text-amber-500">
              Artisan's Corner
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/shop" className="text-stone-700 dark:text-stone-200 hover:text-amber-600">
              Shop
            </Link>
            <Link to="/categories" className="text-stone-700 dark:text-stone-200 hover:text-amber-600">
              Categories
            </Link>
            <Link to="/stores" className="text-stone-700 dark:text-stone-200 hover:text-amber-600">
              Artisans
            </Link>
            <Link to="/about" className="text-stone-700 dark:text-stone-200 hover:text-amber-600">
              About
            </Link>
            {user?.role === 'vendor' && (
              <Link to="/dashboard/seller" className="text-stone-700 dark:text-stone-200 hover:text-amber-600">
                Dashboard
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link to="/dashboard/admin" className="text-stone-700 dark:text-stone-200 hover:text-amber-600">
                Admin
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <Link to="/search?q=" className="p-2 text-stone-600 dark:text-stone-300 hover:text-amber-600">
              <Search className="w-5 h-5" />
            </Link>

            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="p-2 text-stone-600 dark:text-stone-300 hover:text-amber-600"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {isAuthenticated && (
              <Link to="/notifications" className="p-2 text-stone-600 dark:text-stone-300 hover:text-amber-600 relative">
                <Bell className="w-5 h-5" />
              </Link>
            )}

            <Link to="/cart" className="p-2 text-stone-600 dark:text-stone-300 hover:text-amber-600 relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2">
                  <img
                    src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=amber&color=fff`}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full"
                  />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-stone-800 rounded-md shadow-lg py-1 hidden group-hover:block z-50">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-stone-700 dark:text-stone-200 hover:bg-stone-100">
                    Profile
                  </Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm text-stone-700 dark:text-stone-200 hover:bg-stone-100">
                    My Orders
                  </Link>
                  <Link to="/wishlist" className="block px-4 py-2 text-sm text-stone-700 dark:text-stone-200 hover:bg-stone-100">
                    Wishlist
                  </Link>
                  <Link to="/addresses" className="block px-4 py-2 text-sm text-stone-700 dark:text-stone-200 hover:bg-stone-100">
                    Addresses
                  </Link>
                  {user?.role === 'vendor' && (
                    <>
                      <hr className="my-1" />
                      <Link to="/dashboard/seller" className="block px-4 py-2 text-sm text-stone-700 dark:text-stone-200 hover:bg-stone-100">
                        Seller Dashboard
                      </Link>
                      <Link to="/dashboard/seller/products" className="block px-4 py-2 text-sm text-stone-700 dark:text-stone-200 hover:bg-stone-100">
                        My Products
                      </Link>
                      <Link to="/dashboard/seller/orders" className="block px-4 py-2 text-sm text-stone-700 dark:text-stone-200 hover:bg-stone-100">
                        Orders
                      </Link>
                    </>
                  )}
                  {user?.role === 'admin' && (
                    <>
                      <hr className="my-1" />
                      <Link to="/dashboard/admin" className="block px-4 py-2 text-sm text-stone-700 dark:text-stone-200 hover:bg-stone-100">
                        Admin Panel
                      </Link>
                    </>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-stone-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="text-stone-700 dark:text-stone-200 hover:text-amber-600">
                  Login
                </Link>
                <Link to="/register" className="bg-amber-600 text-white px-4 py-2 rounded-button hover:bg-amber-700">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}