// client/src/pages/StorePage.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Calendar, ShoppingBag, Globe, ExternalLink, Camera } from 'lucide-react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function StorePage() {
  const { slug } = useParams();
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        setIsLoading(true);
        const storeRes = await axios.get(`${API_URL}/stores/${slug}`);
        setStore(storeRes.data.data.store);
        
        const productsRes = await axios.get(`${API_URL}/products?store=${storeRes.data.data.store._id}`);
        setProducts(productsRes.data.data.products);
      } catch (error) {
        console.error('Error fetching store:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchStoreData();
    }
  }, [slug]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Store Not Found</h2>
          <p className="text-gray-600 mb-4">The store you're looking for doesn't exist.</p>
          <Link to="/products" className="text-amber-600 hover:text-amber-700">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Banner */}
      <div className="h-48 md:h-64 bg-gradient-to-r from-amber-100 to-orange-100">
        {store.banner && (
          <img
            src={store.banner}
            alt={store.name}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Store Info */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative">
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <img
                src={store.logo || `https://ui-avatars.com/api/?name=${store.name}&size=128&background=amber&color=fff`}
                alt={store.name}
                className="w-32 h-32 rounded-xl object-cover border-4 border-white shadow-md"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-gray-900 font-serif">{store.name}</h1>
                    {store.isVerified && (
                      <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-sm font-medium">
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 mt-1">{store.category}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      <span className="font-medium">{store.rating?.toFixed(1) || '0.0'}</span>
                      <span className="text-gray-500">(0 reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <ShoppingBag className="w-4 h-4" />
                      <span>{store.totalOrders || 0} sales</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                    {store.socialLinks?.instagram && (
                    <a
                      href={store.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <Camera className="w-5 h-5" />
                    </a>
                  )}
                  {store.socialLinks?.website && (
                    <a
                      href={store.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <Globe className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
              {store.description && (
                <p className="text-gray-600 mt-4 line-clamp-3">{store.description}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="border-b border-gray-200">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('products')}
              className={`pb-4 px-1 font-medium border-b-2 transition-colors ${
                activeTab === 'products'
                  ? 'border-amber-600 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              All Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`pb-4 px-1 font-medium border-b-2 transition-colors ${
                activeTab === 'about'
                  ? 'border-amber-600 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              About
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 px-1 font-medium border-b-2 transition-colors ${
                activeTab === 'reviews'
                  ? 'border-amber-600 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Reviews
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="py-8">
          {activeTab === 'products' && (
            <>
              {products.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">This store has no products yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'about' && (
            <div className="max-w-2xl">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About {store.name}</h2>
              <div className="prose text-gray-600">
                {store.description || 'No description provided.'}
              </div>
              <div className="mt-6 flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date(store.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="text-center py-12">
              <p className="text-gray-500">No reviews yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
