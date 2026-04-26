import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist } from '../features/uiSlice';
import { formatPrice } from '../utils/formatCurrency';

export default function WishlistPage() {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.ui);

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your Wishlist</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Your wishlist is empty.</p>
          <Link to="/products" className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Your Wishlist ({wishlist.length})</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div key={product._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <Link to={`/product/${product._id}`}>
                <img 
                  src={product.images?.[0] || 'https://via.placeholder.com/400'} 
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
              </Link>
              <div className="p-4">
                <Link to={`/product/${product._id}`}>
                  <h3 className="font-semibold text-gray-900 dark:text-white hover:text-amber-600 truncate">
                    {product.title}
                  </h3>
                </Link>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{product.category}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    formatPrice(product.price)
                  </span>
                  <button
                    onClick={() => handleRemove(product._id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
