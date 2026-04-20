// client/src/pages/dashboard/StoreSettings.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload, X, Save, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const storeSchema = z.object({
  name: z.string().min(3, 'Store name must be at least 3 characters'),
  description: z.string().max(1000, 'Description cannot exceed 1000 characters'),
  category: z.string().min(1, 'Category is required'),
  instagram: z.string().optional(),
  website: z.string().optional(),
  etsy: z.string().optional(),
});

const categories = ['Jewelry', 'Pottery', 'Textiles', 'Woodwork', 'Art', 'Candles', 'Leather', 'Other'];

export default function StoreSettings() {
  const { user } = useSelector((state) => state.auth);
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(user?.storeProfile?.logo);
  const [banner, setBanner] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(user?.storeProfile?.banner);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: user?.storeProfile?.storeName || '',
      description: user?.storeProfile?.bio || '',
      category: '',
      instagram: user?.storeProfile?.socialLinks?.instagram || '',
      website: user?.storeProfile?.socialLinks?.website || '',
      etsy: user?.storeProfile?.socialLinks?.etsy || '',
    },
  });

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBanner(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const formData = new FormData();
      
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('socialLinks', JSON.stringify({
        instagram: data.instagram,
        website: data.website,
        etsy: data.etsy,
      }));

      if (logo) formData.append('logo', logo);
      if (banner) formData.append('banner', banner);

      await axios.put(`${API_URL}/vendor/store/settings`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Store settings updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeactivate = async () => {
    if (!window.confirm('Are you sure you want to deactivate your store? This will hide all your products.')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('accessToken');
      await axios.put(
        `${API_URL}/vendor/store/deactivate`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Store deactivated');
      window.location.reload();
    } catch (error) {
      toast.error('Failed to deactivate store');
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 font-serif mb-6">Store Settings</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Logo & Banner */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Store Media</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                <div className="relative aspect-square max-w-xs mx-auto">
                  <img
                    src={logoPreview || '/placeholder.jpg'}
                    alt="Store logo"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer rounded-xl">
                    <Upload className="w-8 h-8 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Banner</label>
                <div className="relative h-48 max-w-xs mx-auto">
                  <img
                    src={bannerPreview || '/placeholder-banner.jpg'}
                    alt="Store banner"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer rounded-xl">
                    <Upload className="w-8 h-8 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBannerChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Store Info */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Store Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                <input
                  {...register('name')}
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  {...register('category')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  {...register('description')}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  placeholder="Tell customers about your store and products..."
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Social Links</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                <input
                  {...register('instagram')}
                  type="url"
                  placeholder="https://instagram.com/..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input
                  {...register('website')}
                  type="url"
                  placeholder="https://..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Etsy</label>
                <input
                  {...register('etsy')}
                  type="url"
                  placeholder="https://etsy.com/..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 disabled:opacity-50 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>

        {/* Danger Zone */}
        <div className="mt-8 bg-white rounded-xl shadow-card p-6 border border-red-200">
          <h2 className="font-semibold text-red-600 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Danger Zone
          </h2>
          <p className="text-gray-600 mb-4">
            Deactivating your store will hide all your products from the marketplace.
          </p>
          <button
            onClick={handleDeactivate}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Deactivate Store
          </button>
        </div>
      </div>
    </div>
  );
}
