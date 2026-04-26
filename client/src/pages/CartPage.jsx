// client/src/pages/CartPage.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, updateCartItem, removeFromCart, saveForLater, moveToCart } from '../features/cartSlice';
import { formatPrice } from '../utils/formatCurrency';

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, subtotal, isLoading } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Please login to view your cart</h2>
          <Link to="/login" className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700">
            Login
          </Link>
        </div>
      </div>
    );
  }

  const cartItems = items.filter(item => !item.savedForLater);
  const savedItems = items.filter(item => item.savedForLater);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>

        {cartItems.length === 0 && savedItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">Your cart is empty</p>
            <Link to="/products" className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="bg-white dark:bg-gray-800 rounded-lg p-4 flex gap-4">
                  <img src={item.image || '/placeholder.jpg'} alt={item.title} className="w-24 h-24 object-cover rounded-lg" />
                  <div className="flex-1">
                    <Link to={`/product/${item.productId}`} className="font-semibold text-gray-900 dark:text-white hover:text-amber-600">
                      {item.title}
                    </Link>
                    <p className="text-amber-600 font-bold mt-1">formatPrice(item.price)</p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded">
                        <button onClick={() => dispatch(updateCartItem({ itemId: item._id, quantity: Math.max(1, item.quantity - 1) }))} className="px-3 py-1 text-gray-600 dark:text-gray-300">-</button>
                        <span className="px-3 py-1 text-gray-900 dark:text-white">{item.quantity}</span>
                        <button onClick={() => dispatch(updateCartItem({ itemId: item._id, quantity: Math.min(item.stock, item.quantity + 1) }))} className="px-3 py-1 text-gray-600 dark:text-gray-300">+</button>
                      </div>
                      <button onClick={() => dispatch(removeFromCart(item._id))} className="text-red-500 hover:text-red-600">Remove</button>
                      <button onClick={() => dispatch(saveForLater(item._id))} className="text-gray-500 hover:text-amber-600">Save for Later</button>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white">${item.subtotal?.toFixed(2)}</p>
                </div>
              ))}

              {savedItems.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Saved for Later</h2>
                  {savedItems.map((item) => (
                    <div key={item._id} className="bg-white dark:bg-gray-800 rounded-lg p-4 flex gap-4 mb-4">
                      <img src={item.image || '/placeholder.jpg'} alt={item.title} className="w-24 h-24 object-cover rounded-lg opacity-60" />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-white">{item.title}</p>
                        <p className="text-amber-600 font-bold mt-1">formatPrice(item.price)</p>
                        <button onClick={() => dispatch(moveToCart(item._id))} className="text-amber-600 hover:text-amber-700 mt-2">Move to Cart</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="text-gray-900 dark:text-white">${subtotal?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span className="text-gray-900 dark:text-white">Calculated at checkout</span>
                  </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between mb-6">
                    <span className="font-semibold text-gray-900 dark:text-white">Total</span>
                    <span className="font-bold text-xl text-gray-900 dark:text-white">${subtotal?.toFixed(2)}</span>
                  </div>
                  <button onClick={() => navigate('/checkout')} disabled={cartItems.length === 0} className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 disabled:bg-gray-300 font-semibold">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
