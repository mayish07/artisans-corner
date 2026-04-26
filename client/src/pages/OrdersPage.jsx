// client/src/pages/OrdersPage.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../features/orderSlice';
import { formatPrice } from '../utils/formatCurrency';

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { orders, pagination } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getMyOrders({ limit: 10 }));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">You haven't placed any orders yet</p>
            <a href="/products" className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700">Start Shopping</a>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Order #{order._id.slice(-8)}</p>
                    <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.orderStatus === 'delivered' ? 'bg-green-100 text-green-700' :
                    order.orderStatus === 'shipped' ? 'bg-blue-100 text-blue-700' :
                    order.orderStatus === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {order.orderStatus}
                  </span>
                </div>
                <div className="space-y-2">
                  {order.items?.slice(0, 3).map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <img src={item.image || '/placeholder.jpg'} alt="" className="w-12 h-12 object-cover rounded" />
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white">{item.title}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t dark:border-gray-700 mt-4 pt-4 flex justify-between">
                  <p className="text-gray-500">Total: <span className="font-semibold text-gray-900 dark:text-white">formatPrice(order.totalAmount)</span></p>
                  <a href={`/orders/${order._id}`} className="text-amber-600 hover:text-amber-700 text-sm font-medium">View Details →</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
