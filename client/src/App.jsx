import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import { ArrowRight, Star, Heart, Package, Store } from 'lucide-react';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('demo@artisans.com');
  const [password, setPassword] = useState('demo123');

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('accessToken', 'demo-token');
    localStorage.setItem('user', JSON.stringify({ name: 'Demo User', email }));
    navigate('/home');
  };

  const handleDemoLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('accessToken', 'demo-token');
    localStorage.setItem('user', JSON.stringify({ name: 'Demo User', email: 'demo@artisans.com' }));
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex bg-[#FFFBF5]">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zm0-30V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <div className="text-7xl mb-6">🧵</div>
          <h2 className="text-4xl font-bold mb-4">Artisan's Corner</h2>
          <p className="text-amber-100 text-lg mb-8">Your gateway to handmade treasures from verified artisans across India</p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"><Store className="w-6 h-6" /></div>
              <div>
                <p className="font-semibold">500+ Verified Artisans</p>
                <p className="text-sm text-amber-200">Handpicked makers</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"><Package className="w-6 h-6" /></div>
              <div>
                <p className="font-semibold">10,000+ Products</p>
                <p className="text-sm text-amber-200">Unique handmade items</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"><Heart className="w-6 h-6" /></div>
              <div>
                <p className="font-semibold">50,000+ Happy Customers</p>
                <p className="text-sm text-amber-200">And growing</p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-20 flex items-center gap-1">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
            <span className="ml-2">4.9 rating from 10K+ reviews</span>
          </div>
        </div>

        <div className="absolute top-20 right-20 w-40 h-40 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-60 h-60 bg-white/10 rounded-full"></div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-6xl mb-4 lg:hidden text-center">🧵</div>
          <h1 className="text-3xl font-bold text-amber-900 mb-2">Welcome Back!</h1>
          <p className="text-amber-700 mb-8">Sign in to explore handmade treasures</p>

          <button
            onClick={handleDemoLogin}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors mb-6"
          >
            <span>🎮</span>
            Demo Login (pre-filled)
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-amber-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#FFFBF5] text-amber-600">or sign in with email</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-amber-800 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-800 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-amber-600 border-amber-300 rounded" defaultChecked />
                <span className="ml-2 text-sm text-amber-700">Remember me</span>
              </label>
              <a href="#" className="text-sm text-amber-600 hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
            >
              Sign In <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <p className="mt-8 text-center text-amber-700">
            Don't have an account?{' '}
            <a href="#" className="text-amber-600 font-semibold hover:underline">Sign up free</a>
          </p>

          <div className="mt-8 p-4 bg-amber-50 rounded-lg">
            <p className="text-sm text-amber-700 font-medium mb-2">📦 Shipping Info</p>
            <p className="text-sm text-amber-600">Free shipping on orders above ₹500. Delivery across India within 5-7 days.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <div className="min-h-screen bg-[#FFFBF5] p-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="text-8xl mb-6">🧵</div>
        <h1 className="text-5xl font-bold text-amber-900 mb-4">Welcome to Artisan's Corner!</h1>
        <p className="text-xl text-amber-700 mb-8">Your premium marketplace for handmade treasures</p>
        <div className="p-6 bg-amber-100 rounded-xl">
          <p className="text-amber-800">You're now logged in! Full app coming soon...</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;