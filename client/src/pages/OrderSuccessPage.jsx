// client/src/pages/OrderSuccessPage.jsx
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OrderSuccessPage() {
  const location = useLocation();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (location.state?.order) {
      setOrder(location.state.order);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-modal p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-10 h-10 text-green-600" />
        </motion.div>

        <h1 className="text-2xl font-bold text-gray-900 font-serif mb-2">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for supporting our artisans. Your order has been placed successfully.
        </p>

        {order && (
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Order ID</span>
              <span className="font-mono text-sm">#{order._id?.slice(-8).toUpperCase()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Total</span>
              <span className="font-bold text-amber-600">${order.pricing?.total?.toFixed(2)}</span>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <Link
            to="/orders"
            className="block w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 font-medium flex items-center justify-center gap-2"
          >
            View Order Details
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/products"
            className="block w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 font-medium"
          >
            Continue Shopping
          </Link>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          A confirmation email has been sent to your registered email address.
        </p>
      </motion.div>
    </div>
  );
}
