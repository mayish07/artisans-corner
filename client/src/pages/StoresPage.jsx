import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Star, MapPin, Package } from 'lucide-react';
import { getStores } from '../services/productService';

export default function StoresPage() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStores()
      .then(setStores)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredStores = stores.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-stone-900 to-stone-800 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Our Artisans</h1>
          <p className="text-stone-300 text-lg max-w-2xl mx-auto">
            Meet the talented makers behind Artisan's Corner
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              placeholder="Search stores..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-button border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-white rounded-product p-6 animate-pulse">
                <div className="h-24 bg-stone-200 rounded mb-4" />
                <div className="h-4 bg-stone-200 rounded w-1/2 mb-2" />
                <div className="h-3 bg-stone-200 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : filteredStores.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-stone-300 mx-auto mb-4" />
            <h3 className="font-serif text-xl text-stone-600">No stores found</h3>
            <p className="text-stone-500">Try adjusting your search</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStores.map((store, index) => (
              <Link key={store._id} to={`/store/${store.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-product overflow-hidden shadow-card hover:shadow-card-hover transition-all group"
                >
                  <div className="h-32 bg-stone-100 relative">
                    {store.banner && (
                      <img src={store.banner} alt="" className="w-full h-full object-cover" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      {store.logo && (
                        <img src={store.logo} alt="" className="w-12 h-12 rounded-full object-cover border-2 border-white -mt-8 relative" />
                      )}
                      <h3 className="font-serif text-lg text-stone-900 group-hover:text-amber-600 transition">
                        {store.name}
                      </h3>
                    </div>
                    <p className="text-stone-600 text-sm line-clamp-2 mb-4">{store.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-amber-600">
                        <Star className="w-4 h-4 fill-current mr-1" />
                        {store.rating?.toFixed(1) || 'New'}
                      </div>
                      <div className="flex items-center text-stone-500">
                        <Package className="w-4 h-4 mr-1" />
                        {store.totalSales || 0} sales
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}