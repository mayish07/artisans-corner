import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../features/authSlice';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
    return () => dispatch(clearError());
  }, [isAuthenticated, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  const handleDemoLogin = () => {
    localStorage.setItem('accessToken', 'demo-token-12345');
    localStorage.setItem('refreshToken', 'demo-refresh-12345');
    localStorage.setItem('user', JSON.stringify({
      _id: 'demo-user-id',
      name: 'Demo User',
      email: 'demo@artisans.com',
      role: 'buyer',
      avatar: null,
      createdAt: new Date().toISOString()
    }));
    window.location.href = '/home';
  };

  return (
    <div className="min-h-screen flex bg-[#FFFBF5]">
      <div className="hidden lg:flex lg:w-1/2 bg-amber-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zm0-30V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-amber-100 text-lg mb-8">Sign in to explore handmade treasures</p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">🧵</div>
              <div>
                <p className="font-semibold">500+ Artisans</p>
                <p className="text-sm text-amber-200">Verified makers</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">✨</div>
              <div>
                <p className="font-semibold">10,000+ Products</p>
                <p className="text-sm text-amber-200">Unique handcrafted items</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">💝</div>
              <div>
                <p className="font-semibold">50,000+ Happy Customers</p>
                <p className="text-sm text-amber-200">And growing</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-20 right-20 w-40 h-40 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-60 h-60 bg-white/10 rounded-full"></div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#FFFBF5]">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="text-3xl">🧵</span>
              <span className="font-bold text-xl text-amber-800">Artisan's Corner</span>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-amber-900 mb-2">Sign In</h1>
            <p className="text-amber-700">Enter your credentials to access your account</p>
          </div>

          <button
            onClick={handleDemoLogin}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors mb-6"
          >
            <span>🎮</span>
            Try Demo Login
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-amber-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#FFFBF5] text-amber-600">or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-amber-800 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none bg-white transition-colors"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-800 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-12 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none bg-white transition-colors"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-amber-600 border-amber-300 rounded focus:ring-amber-500" />
                <span className="ml-2 text-sm text-amber-700">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-amber-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-all disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <p className="mt-8 text-center text-amber-700">
            Don't have an account?{' '}
            <Link to="/register" className="text-amber-600 font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
