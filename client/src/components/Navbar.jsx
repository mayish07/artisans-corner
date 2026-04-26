// client/src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';
import { getCart } from '../features/cartSlice';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Bell, Search, Menu, X, Heart, Package, User, Store, ShoppingCart, ChevronDown, LogOut, Settings, Package2 } from 'lucide-react';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const categoryRef = useRef(null);
  
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { itemCount } = useSelector((state) => state.cart);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setIsCategoryOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg' 
          : 'bg-white dark:bg-gray-900 shadow-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg"
            >
              <span className="text-2xl">🧵</span>
            </motion.div>
            <div className="hidden sm:block">
              <span className="font-serif text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Artisan's Corner
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Handmade with Love</p>
            </div>
          </Link>

          <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search handmade products, artisans..."
                className="w-full pl-12 pr-4 py-3 bg-stone-100 dark:bg-stone-800 border-0 rounded-full focus:ring-2 focus:ring-amber-500 dark:text-white transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-amber-500" />
              <motion.button 
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-amber-600 text-white px-4 py-1.5 rounded-full hover:bg-amber-700 transition-colors"
              >
                Search
              </motion.button>
            </div>
          </form>

          <div className="hidden lg:flex items-center space-x-1">
            <Link to="/shop" className="px-4 py-2 text-stone-700 dark:text-stone-200 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-stone-800 rounded-lg font-medium transition-colors">
              All Products
            </Link>
            
            <div className="relative" ref={categoryRef}>
              <motion.button 
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                whileHover={{ scale: 1.02 }}
                className="px-4 py-2 text-stone-700 dark:text-stone-200 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-stone-800 rounded-lg font-medium transition-colors flex items-center gap-1"
              >
                Categories
                <motion.div
                  animate={{ rotate: isCategoryOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </motion.button>
              
              <AnimatePresence>
                {isCategoryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-stone-800 rounded-xl shadow-xl border border-gray-100 dark:border-stone-700 py-2 z-50"
                  >
                    {categories.map((cat) => (
                      <motion.div
                        key={cat.slug}
                        whileHover={{ x: 4, backgroundColor: 'rgb(255, 251, 235)' }}
                      >
                        <Link
                          to={`/categories/${cat.slug}`}
                          onClick={() => setIsCategoryOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-stone-700 dark:text-stone-200 transition-colors"
                        >
                          <span className="text-xl">{cat.icon}</span>
                          <span className="font-medium">{cat.name}</span>
                        </Link>
                      </motion.div>
                    ))}
                    <div className="border-t border-gray-100 dark:border-stone-700 mt-2 pt-2">
                      <Link to="/categories" onClick={() => setIsCategoryOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-amber-600 hover:bg-amber-50 dark:hover:bg-stone-700 transition-colors">
                        <span className="text-xl">✨</span>
                        <span className="font-medium">View All Categories</span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/stores" className="px-4 py-2 text-stone-700 dark:text-stone-200 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-stone-800 rounded-lg font-medium transition-colors">
              Artisans
            </Link>
            <Link to="/contact" className="px-4 py-2 text-stone-700 dark:text-stone-200 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-stone-800 rounded-lg font-medium transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            <Link to="/search" className="lg:hidden p-2 text-stone-600 dark:text-stone-300 hover:text-amber-600">
              <Search className="w-5 h-5" />
            </Link>

            <motion.button 
              onClick={() => setDarkMode(!darkMode)} 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2.5 text-stone-600 dark:text-stone-300 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-stone-800 rounded-full transition-colors"
            >
              <AnimatePresence mode="wait">
                {darkMode ? (
                  <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <Sun className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Moon className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {isAuthenticated && (
              <>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Link to="/wishlist" className="p-2.5 text-stone-600 dark:text-stone-300 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-stone-800 rounded-full transition-colors relative">
                    <Heart className="w-5 h-5" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Link to="/notifications" className="p-2.5 text-stone-600 dark:text-stone-300 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-stone-800 rounded-full transition-colors relative">
                    <Bell className="w-5 h-5" />
                  </Link>
                </motion.div>
              </>
            )}

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link to="/cart" className="p-2.5 text-stone-600 dark:text-stone-300 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-stone-800 rounded-full transition-colors relative">
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {itemCount > 9 ? '9+' : itemCount}
                  </motion.span>
                )}
              </Link>
            </motion.div>

            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <motion.button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 p-1 hover:bg-amber-50 dark:hover:bg-stone-800 rounded-full transition-colors ml-2"
                >
                  <img
                    src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=amber&color=fff`}
                    alt={user?.name}
                    className="w-9 h-9 rounded-full border-2 border-amber-500"
                  />
                </motion.button>
                
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-64 bg-white dark:bg-stone-800 rounded-xl shadow-xl border border-gray-100 dark:border-stone-700 py-2 z-50"
                    >
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-stone-700">
                        <p className="font-semibold text-stone-900 dark:text-white">{user?.name}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                      <Link to="/profile" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-stone-700 dark:text-stone-200 hover:bg-amber-50 dark:hover:bg-stone-700 transition-colors">
                        <User className="w-4 h-4" /> My Profile
                      </Link>
                      <Link to="/orders" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-stone-700 dark:text-stone-200 hover:bg-amber-50 dark:hover:bg-stone-700 transition-colors">
                        <Package className="w-4 h-4" /> My Orders
                      </Link>
                      <Link to="/wishlist" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-stone-700 dark:text-stone-200 hover:bg-amber-50 dark:hover:bg-stone-700 transition-colors">
                        <Heart className="w-4 h-4" /> Wishlist
                      </Link>
                      <Link to="/addresses" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-stone-700 dark:text-stone-200 hover:bg-amber-50 dark:hover:bg-stone-700 transition-colors">
                        <Store className="w-4 h-4" /> Addresses
                      </Link>
                      
                      {user?.role === 'vendor' && (
                        <>
                          <div className="border-t border-gray-100 dark:border-stone-700 my-2" />
                          <Link to="/dashboard/seller" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-amber-600 font-medium hover:bg-amber-50">
                            <Package2 className="w-4 h-4" /> Seller Dashboard
                          </Link>
                        </>
                      )}
                      {user?.role === 'admin' && (
                        <>
                          <div className="border-t border-gray-100 dark:border-stone-700 my-2" />
                          <Link to="/dashboard/admin" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-purple-600 font-medium hover:bg-purple-50">
                            <Settings className="w-4 h-4" /> Admin Panel
                          </Link>
                        </>
                      )}
                      <div className="border-t border-gray-100 dark:border-stone-700 my-2" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-2">
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="hidden sm:block px-4 py-2 text-stone-700 dark:text-stone-200 hover:text-amber-600 font-medium"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(180, 83, 9, 0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-2.5 rounded-full font-semibold shadow-lg shadow-amber-500/30"
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </div>
            )}

            <motion.button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="lg:hidden p-2.5 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden py-4 border-t dark:border-stone-700"
            >
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
                {[
                  { to: '/shop', icon: Package, label: 'All Products' },
                  { to: '/categories', icon: Grid, label: 'Categories' },
                  { to: '/stores', icon: Store, label: 'Artisans' },
                  { to: '/about', icon: Info, label: 'About Us' },
                  { to: '/contact', icon: MessageCircle, label: 'Contact' },
                ].map(({ to, icon: Icon, label }) => (
                  <Link key={to} to={to} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-stone-700 dark:text-stone-200 hover:bg-amber-50 dark:hover:bg-stone-800 rounded-lg">
                    <Icon className="w-5 h-5" /> {label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

function Grid(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}

function Info(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function MessageCircle(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}