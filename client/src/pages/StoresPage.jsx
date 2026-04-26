// client/src/pages/StoresPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, MapPin, Package } from 'lucide-react';

const stores = [
  { _id: '1', name: 'Earth & Clay', slug: 'earth-clay', description: 'Handcrafted pottery from local artisans', logo: '🏺', cover: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600', vendor: 'Ravi Kumar', productCount: 45, rating: 4.8, location: 'Jaipur, Rajasthan' },
  { _id: '2', name: 'Heritage Jewelry', slug: 'heritage-jewelry', description: 'Traditional Indian jewelry designs', logo: '💍', cover: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600', vendor: 'Meera Shah', productCount: 32, rating: 4.9, location: 'Delhi' },
  { _id: '3', name: 'Silk Road', slug: 'silk-road', description: 'Premium handwoven textiles', logo: '🧵', cover: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600', vendor: 'Lakshmi Devi', productCount: 28, rating: 4.7, location: 'Varanasi, UP' },
  { _id: '4', name: 'Wood Wonders', slug: 'wood-wonders', description: 'Intricate wooden handicrafts', logo: '🪵', cover: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600', vendor: 'Suresh Patel', productCount: 38, rating: 4.6, location: 'Gujarat' },
  { _id: '5', name: 'Canvas Studio', slug: 'canvas-studio', description: 'Original artwork and paintings', logo: '🎨', cover: 'https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=600', vendor: 'Ankit Mehta', productCount: 22, rating: 4.9, location: 'Mumbai' },
  { _id: '6', name: 'Flame & Wick', slug: 'flame-wick', description: 'Handmade scented candles', logo: '🕯️', cover: 'https://images.unsplash.com/photo-1602607434848-c1d2e3c2a299?w=600', vendor: 'Priya Singh', productCount: 35, rating: 4.8, location: 'Bangalore' },
];

export default function StoresPage() {
  const [search, setSearch] = useState('');

  const filteredStores = stores.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-b from-amber-700 to-amber-900 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl text-white font-bold mb-4">Our Artisans</h1>
          <p className="text-amber-200 text-lg max-w-2xl mx-auto">
            Meet the talented makers behind Artisan's Corner
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="relative max-w-md mx-auto mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search stores..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStores.map((store) => (
            <Link key={store._id} to={`/store/${store.slug}`} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-32 bg-gradient-to-r from-amber-500 to-orange-500"></div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">{store.logo}</span>
                  <div>
                    <h3 className="font-bold text-lg">{store.name}</h3>
                    <p className="text-sm text-gray-500">{store.vendor}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{store.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-gray-500">
                    <MapPin className="w-4 h-4" />
                    {store.location}
                  </div>
                  <div className="flex items-center gap-1 text-amber-600">
                    <Package className="w-4 h-4" />
                    {store.productCount} products
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(store.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                  <span className="text-sm text-gray-500 ml-1">({store.rating})</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}