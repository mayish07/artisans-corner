// client/src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';
import { getCart } from '../features/cartSlice';
import { useEffect, useState } from 'react';
import { Sun, Moon, Bell, Search, Menu, X, Heart, Package, User, Store } from 'lucide-react';

const categories = [
  { name: 'Pottery', slug: 'pottery', icon: '🏺' },
  { name: 'Jewelry', slug: 'jewelry', icon: '💍' },
  { name: 'Textiles', slug: 'textiles', icon: '🧵' },
  { name: 'Woodwork', slug: 'woodwork', icon: '🪵' },
  { name: 'Art', slug: 'art', icon: '🎨' },
  { name: 'Candles', slug: 'candles', icon: '🕯️' },
  { name: 'Leather', slug: 'leather', icon: '👜' },
];

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="bg-white dark:bg-stone-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-2xl">🧵</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-serif text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Artisan's Corner
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Handmade with Love</p>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search handmade products, artisans..."
                className="w-full pl-12 pr-4 py-3 bg-stone-100 dark:bg-stone-800 border-0 rounded-full focus:ring-2 focus:ring-amber-500 dark:text-white"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-amber-600 text-white px-4 py-1.5 rounded-full hover:bg-amber-700 transition-colors">
                Search
              </button>
            </div>
          </form>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link to="/shop" className="px-4 py-2 text-stone-700 dark:text-stone-200 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-stone-800 rounded-lg font-medium transition-colors">
              All Products
            </Link>
            
            <div className="relative">
              <button 
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="px-4 py-2 text-stone-700 dark:text-stone-200 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-stone-800 rounded-lg font-medium transition-colors flex items-center gap-1"
              >
                Categories
                <svg className={`w-4 h-4 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isCategoryOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-stone-800 rounded-xl shadow-xl border border-gray-100 dark:border-stone-700 py-2 z-50">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/categories/${cat.slug}`}
                      onClick={() => setIsCategoryOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-stone-700 dark:text-stone-200 hover:bg-amber-50 dark:hover:bg-stone-700 transition-colors"
                    >
                      <span className="text-xl">{cat.icon}</span>
                      <span className="font-medium">{cat.name}</span>
                    </Link>
                  ))}
                  <Link to="/categories" onClick={() => setIsCategoryOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-amber-600 hover:bg-amber-50 dark:hover:bg-stone-700 border-t mt-2 pt-2">
                    <span className="text-xl">✨</span>
                    <span className="font-medium">View All Categories</span>
                  </Link>
                </div>
              )}
            </div>

            <Link to="/stores" className="px-4 py-2 text-stone-700 dark:text-stone-200 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-stone-800 rounded-lg font-medium transition-colors">
              Artisans
            </Link>
            <Link to="/contact" className="px-4 py-2 text-stone-700 dark:text-stone-200 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-stone-800 rounded-lg font-medium transition-colors">
              Contact
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-2">
            <Link to="/search" className="md:hidden p-2 text-stone-600 dark:text-stone-300 hover:text-amber-600">
              <Search className="w-5 h-5" />
            </Link>

            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="p-2.5 text-stone-600 dark:text-stone-300 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-stone-800 rounded-full transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {isAuthenticated && (
              <>
                <Link to="/wishlist" className="p-2.5 text-stone-600 dark:text-stone-300 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-stone-800 rounded-full transition-colors relative">
                  <Heart className="w-5 h-5" />
                </Link>
                <Link to="/notifications" className="p-2.5 text-stone-600 dark:text-stone-300 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-stone-800 rounded-full transition-colors relative">
                  <Bell className="w-5 h-5" />
                </Link>
              </>
            )}

            <Link to="/cart" className="p-2.5 text-stone-600 dark:text-stone-300 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-stone-800 rounded-full transition-colors relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-1 hover:bg-amber-50 dark:hover:bg-stone-800 rounded-full transition-colors">
                  <img
                    src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=amber&color=fff`}
                    alt={user?.name}
                    className="w-9 h-9 rounded-full border-2 border-amber-500"
                  />
                </button>
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-stone-800 rounded-xl shadow-xl border border-gray-100 dark:border-stone-700 py-2 hidden group-hover:block z-50">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-stone-700">
                    <p className="font-semibold text-stone-900 dark:text-white">{user?.name}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                  <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-stone-700 dark:text-stone-200 hover:bg-amber-50 dark:hover:bg-stone-700">
                    <User className="w-4 h-4" /> My Profile
                  </Link>
                  <Link to="/orders" className="flex items-center gap-3 px-4 py-2.5 text-stone-700 dark:text-stone-200 hover:bg-amber-50 dark:hover:bg-stone-700">
                    <Package className="w-4 h-4" /> My Orders
                  </Link>
                  <Link to="/wishlist" className="flex items-center gap-3 px-4 py-2.5 text-stone-700 dark:text-stone-200 hover:bg-amber-50 dark:hover:bg-stone-700">
                    <Heart className="w-4 h-4" /> Wishlist
                  </Link>
                  <Link to="/addresses" className="flex items-center gap-3 px-4 py-2.5 text-stone-700 dark:text-stone-200 hover:bg-amber-50 dark:hover:bg-stone-700">
                    <Store className="w-4 h-4" /> Addresses
                  </Link>
                  
                  {user?.role === 'vendor' && (
                    <>
                      <div className="border-t my-2"></div>
                      <Link to="/dashboard/seller" className="flex items-center gap-3 px-4 py-2.5 text-amber-600 font-medium hover:bg-amber-50">
                        <Store className="w-4 h-4" /> Seller Dashboard
                      </Link>
                    </>
                  )}
                  {user?.role === 'admin' && (
                    <>
                      <div className="border-t my-2"></div>
                      <Link to="/dashboard/admin" className="flex items-center gap-3 px-4 py-2.5 text-purple-600 font-medium hover:bg-purple-50">
                        <Package className="w-4 h-4" /> Admin Panel
                      </Link>
                    </>
                  )}
                  <div className="border-t my-2"></div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="hidden sm:block px-4 py-2 text-stone-700 dark:text-stone-200 hover:text-amber-600 font-medium">
                  Login
                </Link>
                <Link to="/register" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-2.5 rounded-full font-semibold hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/30 transition-all hover:scale-105">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="lg:hidden p-2.5 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t dark:border-stone-700">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-12 pr-4 py-3 bg-stone-100 dark:bg-stone-800 rounded-xl border-0 dark:text-white"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </form>
            
            <div className="space-y-1">
              <Link to="/shop" className="flex items-center gap-3 px-4 py-3 text-stone-700 dark:text-stone-200 hover:bg-amber-50 dark:hover:bg-stone-800 rounded-lg">
                <Package className="w-5 h-5" /> All Products
              </Link>
              <Link to="/categories" className="flex items-center gap-3 px-4 py-3 text-stone-700 dark:text-stone-200 hover:bg-amber-50 dark:hover:bg-stone-800 rounded-lg">
                🏷️ Categories
              </Link>
              <Link to="/stores" className="flex items-center gap-3 px-4 py-3 text-stone-700 dark:text-stone-200 hover:bg-amber-50 dark:hover:bg-stone-800 rounded-lg">
                <Store className="w-5 h-5" /> Artisans
              </Link>
              <Link to="/about" className="flex items-center gap-3 px-4 py-3 text-stone-700 dark:text-stone-200 hover:bg-amber-50 dark:hover:bg-stone-800 rounded-lg">
                About Us
              </Link>
              <Link to="/contact" className="flex items-center gap-3 px-4 py-3 text-stone-700 dark:text-stone-200 hover:bg-amber-50 dark:hover:bg-stone-800 rounded-lg">
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}