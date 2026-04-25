import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../features/authSlice';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ email: '', password: '' });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    return () => dispatch(clearError());
  }, [isAuthenticated, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  const fillDemo = (e) => {
    e.preventDefault();
    setFormData({ email: 'demo@demo.com', password: 'demo123' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background - Amber/Orange Theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-orange-900 to-amber-800"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zm0-30V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
      </div>
      
      {/* Floating Orbs - Amber/Orange */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 max-w-md w-full mx-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500" style={{ fontFamily: 'Orbitron, monospace' }}>
            ARTISAN'S CORNER
          </h1>
          <p className="text-amber-300 mt-1 tracking-widest uppercase text-xs">Multi-Vendor Marketplace</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-amber-500/20">
          <h2 className="text-2xl font-bold text-white text-center mb-6">Welcome Back</h2>

          {error && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-300 p-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <div className="mb-5">
            <label className="block text-sm font-medium text-amber-100 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-amber-500/20 rounded-lg text-white placeholder-amber-200/50 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-amber-100 mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-amber-500/20 rounded-lg text-white placeholder-amber-200/50 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-amber-500/30 bg-white/5 text-amber-500 focus:ring-amber-500" defaultChecked />
              <span className="ml-2 text-sm text-amber-100">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-sm text-amber-400 hover:text-amber-300">Forgot password?</Link>
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-lg hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 font-bold transition transform hover:scale-[1.02]">
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                Signing in...
              </span>
            ) : 'Sign In'}
          </button>

          {/* Demo Login Button */}
          <button type="button" onClick={fillDemo} className="w-full mt-3 bg-amber-500/20 border border-amber-500/30 text-amber-200 py-3 rounded-lg hover:bg-amber-500/30 font-semibold transition">
            🚀 Demo Login
          </button>

          <p className="text-center text-amber-200/60 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-amber-400 hover:text-amber-300 font-semibold">Sign up</Link>
          </p>
        </form>

        <div className="text-center mt-6 text-amber-200/40 text-xs">
          © 2026 Artisan's Corner | Multi-Vendor Handmade Goods Marketplace
        </div>
      </div>
    </div>
  );
}