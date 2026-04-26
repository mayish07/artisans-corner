// client/src/pages/ProductsPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Filter } from 'lucide-react';

const categories = [
  { _id: '1', name: 'All Products', slug: '' },
  { _id: '2', name: 'Pottery', slug: 'pottery' },
  { _id: '3', name: 'Jewelry', slug: 'jewelry' },
  { _id: '4', name: 'Textiles', slug: 'textiles' },
  { _id: '5', name: 'Woodwork', slug: 'woodwork' },
  { _id: '6', name: 'Art', slug: 'art' },
  { _id: '7', name: 'Candles', slug: 'candles' },
];

const products = [
  { _id: '1', name: 'Handcrafted Ceramic Vase', price: 89, image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400', rating: 4.8, reviews: 24, store: 'Earth & Clay', category: 'Pottery' },
  { _id: '2', name: 'Silver Kundan Necklace', price: 450, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400', rating: 4.9, reviews: 56, store: 'Heritage Jewelry', category: 'Jewelry' },
  { _id: '3', name: 'Handwoven Silk Saree', price: 1200, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400', rating: 4.7, reviews: 18, store: 'Silk Road', category: 'Textiles' },
  { _id: '4', name: 'Carved Wooden Box', price: 250, image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400', rating: 4.6, reviews: 32, store: 'Wood Wonders', category: 'Woodwork' },
  { _id: '5', name: 'Abstract Oil Painting', price: 1800, image: 'https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=400', rating: 5.0, reviews: 8, store: 'Canvas Studio', category: 'Art' },
  { _id: '6', name: 'Scented Soy Candle Set', price: 65, image: 'https://images.unsplash.com/photo-1602607434848-c1d2e3c2a299?w=400', rating: 4.5, reviews: 67, store: 'Flame & Wick', category: 'Candles' },
  { _id: '7', name: 'Brass Diya Set', price: 150, image: 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=400', rating: 4.4, reviews: 41, store: 'Tradition Crafts', category: 'Pottery' },
  { _id: '8', name: 'Beaded Earrings', price: 120, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400', rating: 4.7, reviews: 29, store: 'Bead Works', category: 'Jewelry' },
  { _id: '9', name: 'Handmade Wall Hanging', price: 350, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400', rating: 4.6, reviews: 15, store: 'Artisan Hub', category: 'Art' },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const filteredProducts = products.filter(p => !selectedCategory || p.category.toLowerCase() === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">All Products</h1>
          <p className="text-center text-gray-600">Browse our collection of handmade treasures</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64">
            <div className="bg-amber-50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5" />
                <h2 className="font-semibold">Filters</h2>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat._id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat.slug}
                        onChange={() => setSelectedCategory(cat.slug)}
                        className="w-4 h-4 text-amber-600"
                      />
                      <span>{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">{filteredProducts.length} products</p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link key={product._id} to={`/product/${product._id}`} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
                    <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-amber-50">
                      <Heart className="w-5 h-5 text-gray-400 hover:text-amber-600" />
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-amber-600 mb-1">{product.store}</p>
                    <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">({product.reviews})</span>
                    </div>
                    <p className="text-xl font-bold text-amber-600">₹{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}