import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search as SearchIcon, Filter, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import productService from '../services/productService';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    category: '',
    inStock: false,
  });
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    setLoading(true);
    productService.getProducts({ 
      search: query, 
      ...filters,
      sort,
      limit: 20 
    })
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [query, filters, sort]);

  const activeFilters = Object.entries(filters).filter(([k, v]) => v && k !== 'inStock').length + (filters.inStock ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-stone-900 to-stone-800 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-serif text-4xl text-white mb-2">Search Results</h1>
          <p className="text-stone-300">
            {products.length} results for "{query}"
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 items-center mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              placeholder="Search products..."
              defaultValue={query}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  window.location.href = `/search?q=${e.target.value}`;
                }
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-button border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
            />
          </div>
          
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2.5 rounded-button border border-stone-300 bg-white"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="popular">Most Popular</option>
          </select>

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 px-4 py-2.5 rounded-button border border-stone-300 cursor-pointer hover:bg-stone-50">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => setFilters(f => ({ ...f, inStock: e.target.checked }))}
                className="w-4 h-4 text-amber-600 rounded"
              />
              <span className="text-sm">In Stock</span>
            </label>
          </div>
        </div>

        {activeFilters > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.minPrice && (
              <span className="flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                Min: ${filters.minPrice}
                <X className="w-4 h-4 cursor-pointer" onClick={() => setFilters(f => ({ ...f, minPrice: '' }))} />
              </span>
            )}
            {filters.maxPrice && (
              <span className="flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                Max: ${filters.maxPrice}
                <X className="w-4 h-4 cursor-pointer" onClick={() => setFilters(f => ({ ...f, maxPrice: '' }))} />
              </span>
            )}
            {filters.category && (
              <span className="flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                {filters.category}
                <X className="w-4 h-4 cursor-pointer" onClick={() => setFilters(f => ({ ...f, category: '' }))} />
              </span>
            )}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="bg-white rounded-product p-4 animate-pulse">
                <div className="aspect-[4/3] bg-stone-200 rounded mb-4" />
                <div className="h-4 bg-stone-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-stone-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <SearchIcon className="w-16 h-16 text-stone-300 mx-auto mb-4" />
            <h3 className="font-serif text-xl text-stone-600 mb-2">No products found</h3>
            <p className="text-stone-500 mb-4">Try different keywords or adjust your filters</p>
            <Link to="/shop" className="text-amber-600 hover:underline">Browse all products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}