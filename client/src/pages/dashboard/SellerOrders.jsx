// client/src/pages/dashboard/SellerOrders.jsx
import { useEffect, useState } from 'react';
import { Package, Eye } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const statusOptions = ['Processing', 'Confirmed', 'Shipped', 'Delivered'];

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.get(`${API_URL}/orders/vendor-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (orderId, newStatus, trackingNumber) => {
    setUpdatingId(orderId);
    try {
      const token = localStorage.getItem('accessToken');
      await axios.put(
        `${API_URL}/orders/${orderId}/status`,
        { status: newStatus, trackingNumber },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders(orders.map((o) => 
        o._id === orderId ? { ...o, status: newStatus, trackingNumber } : o
      ));
    } catch (error) {
      alert('Failed to update order status');
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      Processing: 'bg-orange-100 text-orange-700',
      Confirmed: 'bg-blue-100 text-blue-700',
      Shipped: 'bg-purple-100 text-purple-700',
      Delivered: 'bg-green-100 text-green-700',
      Cancelled: 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const filteredOrders = filterStatus
    ? orders.filter((o) => o.status === filterStatus)
    : orders;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 font-serif">
            Vendor Orders ({orders.length})
          </h1>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
          >
            <option value="">All Statuses</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-xl shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Buyer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => {
                    const myItems = order.items?.filter(
                      (item) => item.vendor?.toString() === order.myVendorId
                    ) || [];
                    const orderTotal = myItems.reduce(
                      (sum, item) => sum + item.price * item.quantity,
                      0
                    );

                    return (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-mono text-sm">
                          #{order._id?.slice(-8).toUpperCase()}
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-sm">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex -space-x-2">
                            {order.items?.slice(0, 3).map((item, i) => (
                              <img
                                key={i}
                                src={item.image || '/placeholder.jpg'}
                                alt={item.name}
                                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                              />
                            ))}
                            {order.items?.length > 3 && (
                              <span className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs">
                                +{order.items.length - 3}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {order.buyer?.name || 'Customer'}
                        </td>
                        <td className="px-6 py-4 font-medium text-amber-600">
                          ${orderTotal.toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={order.status}
                            onChange={(e) => {
                              const newStatus = e.target.value;
                              const tracking = prompt('Enter tracking number (for Shipped status):');
                              updateStatus(order._id, newStatus, tracking);
                            }}
                            disabled={updatingId === order._id || order.status === 'Delivered' || order.status === 'Cancelled'}
                            className="text-sm border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-amber-500"
                          >
                            {statusOptions.map((status) => (
                              <option key={status} value={status}>{status}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
