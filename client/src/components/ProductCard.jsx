// client/src/components/ProductCard.jsx
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { addToWishlist, removeFromWishlist } from '../features/productSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { wishlist } = useSelector((state) => state.products);

  const isInWishlist = wishlist.includes(product._id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      dispatch(addToCart({ productId: product._id, quantity: 1 }));
    }
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    if (!isAuthenticated) return;
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product._id));
    }
  };

  const discount = product.comparePrice && product.price < product.comparePrice
    ? Math.round((1 - product.price / product.comparePrice) * 100)
    : null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group">
      <Link to={`/product/${product.slug || product._id}`} className="block">
        <div className="relative">
          <img
            src={product.images?.[0] || '/placeholder.jpg'}
            alt={product.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.isOutOfStock && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              Out of Stock
            </div>
          )}
          {discount && (
            <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded">
              -{discount}%
            </div>
          )}
          <button
            onClick={handleWishlist}
            className="absolute bottom-2 right-2 p-2 bg-white dark:bg-gray-700 rounded-full shadow-md hover:bg-gray-100"
          >
            <svg
              className={`w-5 h-5 ${isInWishlist ? 'text-red-500 fill-current' : 'text-gray-400'}`}
              fill={isInWishlist ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        <div className="p-4">
          <p className="text-xs text-amber-600 mb-1">{product.category}</p>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {product.title}
          </h3>
          
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.round(product.avgRating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-2">({product.totalReviews || 0})</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                ${product.price?.toFixed(2)}
              </span>
              {product.comparePrice && (
                <span className="text-sm text-gray-400 line-through ml-2">
                  ${product.comparePrice.toFixed(2)}
                </span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!product.stock || product.stock < 1}
              className="bg-amber-600 text-white px-3 py-2 rounded-lg hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
            >
              {product.stock < 1 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
