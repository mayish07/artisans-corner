import { Link } from 'react-router-dom';

export function EmptyCart() {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">🛒</div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Start shopping to add items to your cart</p>
      <Link to="/products" className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700">
        Start Shopping
      </Link>
    </div>
  );
}

export function EmptyWishlist() {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">❤️</div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No saved items yet</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Browse products and save your favorites</p>
      <Link to="/products" className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700">
        Browse Products
      </Link>
    </div>
  );
}

export function EmptyProducts() {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">📦</div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">You haven't listed anything yet</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Create your first product to start selling</p>
      <Link to="/dashboard/seller/products/new" className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700">
        Add Your First Product
      </Link>
    </div>
  );
}

export function EmptyOrders() {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">📋</div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No orders yet</h2>
      <p className="text-gray-500 dark:text-gray-400">When you receive orders, they'll show up here</p>
    </div>
  );
}

export function EmptySearch({ query, onClear }) {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">🔍</div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No results for "{query}"</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Try a different search term</p>
      <button onClick={onClear} className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700">
        Clear Search
      </button>
    </div>
  );
}