import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/productService';

const categories = [
  { id: 'jewelry', name: 'Jewelry & Watches', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400', count: 156 },
  { id: 'clothing', name: 'Clothing & Apparel', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400', count: 243 },
  { id: 'art', name: 'Art & Collectibles', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400', count: 189 },
  { id: 'home', name: 'Home & Living', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045a755?w=400', count: 312 },
  { id: 'crafts', name: 'Craft Supplies', image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400', count: 98 },
  { id: 'bags', name: 'Bags & Purses', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', count: 134 },
  { id: 'ceramics', name: 'Ceramics & Pottery', image: 'https://images.unsplash.com/photo-1565193566173-7a0f3ba4c87a?w=400', count: 87 },
  { id: 'woodwork', name: 'Woodworking', image: 'https://images.unsplash.com/photo-1588854337115-1c67d92424e1?w=400', count: 76 },
  { id: 'candles', name: 'Candles & Fragrance', image: 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=400', count: 112 },
  { id: 'soap', name: 'Bath & Body', image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400', count: 95 },
  { id: 'paper', name: 'Paper & Party', image: 'https://images.unsplash.com/photo-1533035323736-f5ae6fdc14bf?w=400', count: 67 },
  { id: 'toys', name: 'Toys & Games', image: 'https://images.unsplash.com/photo-1558060370-d644479b5d02?w=400', count: 54 },
];

export default function CategoriesPage() {
  const [featuredCategory, setFeaturedCategory] = useState(categories[0]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts({ category: featuredCategory.id, limit: 4 }).then(setProducts).catch(console.error);
  }, [featuredCategory]);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-stone-900 to-stone-800 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Shop by Category</h1>
          <p className="text-stone-300 text-lg max-w-2xl mx-auto">
            Discover unique handmade treasures across all our categories
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link key={category.id} to={`/categories/${category.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative aspect-[4/3] rounded-product overflow-hidden"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-serif text-white text-lg">{category.name}</h3>
                  <p className="text-stone-300 text-sm">{category.count} items</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {products.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl text-stone-900">Featured in {featuredCategory.name}</h2>
              <Link to={`/categories/${featuredCategory.id}`} className="flex items-center text-amber-600 hover:text-amber-700">
                View all <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}