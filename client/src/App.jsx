// client/src/App.jsx
import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import { ArrowRight } from 'lucide-react';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('accessToken', 'demo-token');
    localStorage.setItem('user', JSON.stringify({ name: 'Demo User', email }));
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex bg-[#FFFBF5]">
      <div className="hidden lg:flex lg:w-1/2 bg-amber-600 items-center justify-center p-12">
        <div className="text-white text-center">
          <div className="text-6xl mb-4">🧵</div>
          <h2 className="text-4xl font-bold">Artisan's Corner</h2>
          <p className="mt-4 text-amber-100">Your gateway to handmade treasures</p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-amber-900 mb-2">Sign In</h1>
          <p className="text-amber-700 mb-8">Enter your credentials</p>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-amber-800 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none"
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
                className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700"
            >
              Sign In <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <div className="min-h-screen bg-[#FFFBF5] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-6xl mb-4">🧵</div>
        <h1 className="text-4xl font-bold text-amber-900 mb-4">Welcome to Artisan's Corner!</h1>
        <p className="text-xl text-amber-700">Your home page is loading...</p>
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