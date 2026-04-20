// client/src/pages/BecomeSellerPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { becomeSeller } from '../features/authSlice';

export default function BecomeSellerPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ storeName: '', bio: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(becomeSeller(formData));
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/dashboard/seller');
    }
  };

  if (user?.role === 'vendor') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">You're already a seller!</h2>
          <button onClick={() => navigate('/dashboard/seller')} className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700">Go to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Become a Seller</h1>
          <p className="text-gray-600 dark:text-gray-400">Start selling your handmade products today</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Store Name</label>
              <input
                type="text"
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio (Optional)</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-amber-500"
                rows={4}
                placeholder="Tell customers about your craft and story..."
              />
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">What you get:</h3>
              <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                <li>• Full product management dashboard</li>
                <li>• Sales analytics and insights</li>
                <li>• Order management tools</li>
                <li>• 95% of each sale goes to you (5% platform fee)</li>
              </ul>
            </div>

            <button type="submit" disabled={isLoading} className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 disabled:bg-gray-300 font-semibold">
              {isLoading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
