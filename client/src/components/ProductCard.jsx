// client/src/components/ProductCard.jsx
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { addToWishlist, removeFromWishlist } from '../features/productSlice';
import { useCompare } from '../context/CompareContext';
import { formatPrice } from '../utils/formatCurrency';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, BarChart3, Star, Eye } from 'lucide-react';

export default function ProductCard({ product, index = 0 }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { wishlist } = useSelector((state) => state.products);
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();

  const isInWishlist = wishlist.includes(product._id);
  const inCompare = isInCompare(product._id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAuthenticated) {
      dispatch(addToCart({ productId: product._id, quantity: 1 }));
    }
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) return;
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product._id));
    }
  };

  const handleCompare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(product._id);
    } else {
      addToCompare(product);
    }
  };

  const discount = product.comparePrice && product.price < product.comparePrice
    ? Math.round((1 - product.price / product.comparePrice) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative"
    >
      <Link to={`/product/${product.slug || product._id}`} className="block">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-50 to-stone-100 dark:from-gray-800 dark:to-gray-900">
          <div className="aspect-square overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.5 }}
              src={product.images?.[0] || '/placeholder.jpg'}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Badges */}
          {product.isOutOfStock && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
              Out of Stock
            </div>
          )}
          {discount && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              -{discount}%
            </div>
          )}
          {product.isFeatured && !discount && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              Featured
            </div>
          )}

          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAddToCart}
              disabled={!product.stock || product.stock < 1}
              className="w-full bg-white text-gray-900 py-3 rounded-xl font-semibold hover:bg-amber-500 hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              {product.stock < 1 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleWishlist}
              className={`p-3 rounded-full shadow-lg backdrop-blur-sm transition-colors ${
                isInWishlist
                  ? 'bg-red-500 text-white'
                  : 'bg-white/90 text-gray-600 hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCompare}
              className={`p-3 rounded-full shadow-lg backdrop-blur-sm transition-colors ${
                inCompare
                  ? 'bg-amber-500 text-white'
                  : 'bg-white/90 text-gray-600 hover:text-amber-500'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-3 right-3 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Eye className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="pt-5 space-y-3">
          <div>
            <p className="text-sm text-amber-600 font-medium">{product.category}</p>
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-amber-600 transition-colors line-clamp-2 text-lg">
              {product.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(product.avgRating || 0)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.totalReviews || 0} reviews)</span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.comparePrice)}
                </span>
              )}
            </div>
            <span className={`text-sm font-medium ${product.stock < 1 ? 'text-red-500' : 'text-green-600'}`}>
              {product.stock < 1 ? 'Out of Stock' : 'In Stock'}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}