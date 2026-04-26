// client/src/pages/ComparePage.jsx
import { Link } from 'react-router-dom';
import { useCompare } from '../context/CompareContext';
import ProductCard from '../components/ProductCard';
import { formatCurrency } from '../utils/formatCurrency';

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  if (compareList.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Compare Products</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">No products to compare yet.</p>
          <Link to="/products" className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Compare Products ({compareList.length}/4)</h1>
          <button onClick={clearCompare} className="text-red-600 hover:text-red-700">
            Clear All
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="p-4 text-left text-gray-600 dark:text-gray-400 w-32"></th>
                {compareList.map(product => (
                  <th key={product._id} className="p-4 text-left relative">
                    <button
                      onClick={() => removeFromCompare(product._id)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                    >
                      ✕
                    </button>
                    <img src={product.images?.[0]} alt={product.title} className="w-32 h-32 object-cover rounded-lg mb-3" />
                    <Link to={`/product/${product._id}`} className="font-medium text-gray-900 dark:text-white hover:text-amber-600 line-clamp-2">
                      {product.title}
                    </Link>
                  </th>
                ))}
                {[...Array(4 - compareList.length)].map((_, i) => (
                  <th key={`empty-${i}`} className="p-4 border-l dark:border-gray-700">
                    <Link to="/products" className="flex items-center justify-center h-full text-amber-600 hover:text-amber-700">
                      + Add Product
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b dark:border-gray-700">
                <td className="p-4 font-medium text-gray-600 dark:text-gray-400">Price</td>
                {compareList.map(product => (
                  <td key={product._id} className="p-4 border-l dark:border-gray-700">
                    <span className="text-xl font-bold text-amber-600">{formatCurrency(product.price)}</span>
                    {product.comparePrice > product.price && (
                      <span className="ml-2 text-sm text-gray-400 line-through">{formatCurrency(product.comparePrice)}</span>
                    )}
                  </td>
                ))}
                {[...Array(4 - compareList.length)].map((_, i) => <td key={`empty-${i}`} className="border-l dark:border-gray-700"></td>)}
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td className="p-4 font-medium text-gray-600 dark:text-gray-400">Category</td>
                {compareList.map(product => (
                  <td key={product._id} className="p-4 border-l dark:border-gray-700 text-gray-900 dark:text-white">
                    {product.category}
                  </td>
                ))}
                {[...Array(4 - compareList.length)].map((_, i) => <td key={`empty-${i}`} className="border-l dark:border-gray-700"></td>)}
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td className="p-4 font-medium text-gray-600 dark:text-gray-400">Rating</td>
                {compareList.map(product => (
                  <td key={product._id} className="p-4 border-l dark:border-gray-700">
                    <div className="flex items-center">
                      <span className="text-amber-500 mr-1">★</span>
                      <span className="text-gray-900 dark:text-white">{product.avgRating?.toFixed(1) || 0}</span>
                      <span className="text-gray-400 ml-1">({product.totalReviews || 0})</span>
                    </div>
                  </td>
                ))}
                {[...Array(4 - compareList.length)].map((_, i) => <td key={`empty-${i}`} className="border-l dark:border-gray-700"></td>)}
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td className="p-4 font-medium text-gray-600 dark:text-gray-400">Stock</td>
                {compareList.map(product => (
                  <td key={product._id} className="p-4 border-l dark:border-gray-700">
                    {product.stock > 0 ? (
                      <span className="text-green-600">{product.stock} available</span>
                    ) : (
                      <span className="text-red-500">Out of stock</span>
                    )}
                  </td>
                ))}
                {[...Array(4 - compareList.length)].map((_, i) => <td key={`empty-${i}`} className="border-l dark:border-gray-700"></td>)}
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td className="p-4 font-medium text-gray-600 dark:text-gray-400">Store</td>
                {compareList.map(product => (
                  <td key={product._id} className="p-4 border-l dark:border-gray-700">
                    {product.storeId?.name || 'Unknown Store'}
                    {product.storeId?.isVerified && <span className="ml-1 text-blue-500 text-sm">✓</span>}
                  </td>
                ))}
                {[...Array(4 - compareList.length)].map((_, i) => <td key={`empty-${i}`} className="border-l dark:border-gray-700"></td>)}
              </tr>
              <tr>
                <td className="p-4 font-medium text-gray-600 dark:text-gray-400">Actions</td>
                {compareList.map(product => (
                  <td key={product._id} className="p-4 border-l dark:border-gray-700">
                    <Link to={`/product/${product._id}`} className="text-amber-600 hover:text-amber-700 font-medium">
                      View Details →
                    </Link>
                  </td>
                ))}
                {[...Array(4 - compareList.length)].map((_, i) => <td key={`empty-${i}`} className="border-l dark:border-gray-700"></td>)}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}