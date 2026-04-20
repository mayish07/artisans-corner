// client/src/pages/OrderDetailPage.jsx
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock, XCircle, MapPin, Phone, Mail } from 'lucide-react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../components/LoadingSpinner';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const statusSteps = [
  { key: 'Processing', icon: Clock, color: 'text-orange-500' },
  { key: 'Confirmed', icon: Package, color: 'text-blue-500' },
  { key: 'Shipped', icon: Truck, color: 'text-purple-500' },
  { key: 'Delivered', icon: CheckCircle, color: 'text-green-500' },
];

export default function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const res = await axios.get(`${API_URL}/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrder(res.data.data.order);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    
    try {
      const token = localStorage.getItem('accessToken');
      await axios.put(`${API_URL}/orders/${id}/cancel`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      window.location.reload();
    } catch (error) {
      alert('Failed to cancel order');
    }
  };

  const getStatusIndex = (status) => {
    return statusSteps.findIndex((step) => step.key === status);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
          <Link to="/orders" className="text-amber-600 hover:text-amber-700">
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const currentStatusIndex = getStatusIndex(order.status);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-serif">Order Details</h1>
            <p className="text-gray-500 font-mono text-sm">
              Order #{order._id?.slice(-8).toUpperCase()}
            </p>
          </div>
          <Link to="/orders" className="text-amber-600 hover:text-amber-700">
            Back to Orders
          </Link>
        </div>

        {/* Status Stepper */}
        <div className="bg-white rounded-xl shadow-card p-6 mb-6">
          <div className="flex items-center justify-between">
            {statusSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index <= currentStatusIndex;
              const isCurrent = index === currentStatusIndex;

              return (
                <div key={step.key} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
                      isActive ? 'bg-amber-100' : 'bg-gray-100'
                    } ${isCurrent ? 'ring-2 ring-amber-600 ring-offset-2' : ''}`}
                  >
                    <Icon className={`w-6 h-6 ${isActive ? step.color : 'text-gray-400'}`} />
                  </div>
                  <span className={`text-sm font-medium ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                    {step.key}
                  </span>
                  {index < statusSteps.length - 1 && (
                    <div
                      className={`absolute h-1 w-full -z-10 ${
                        index < currentStatusIndex ? 'bg-amber-600' : 'bg-gray-200'
                      }`}
                      style={{ display: 'none' }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white rounded-xl shadow-card p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Items</h2>
              <div className="space-y-4">
                {order.items?.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <img
                      src={item.image || '/placeholder.jpg'}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <Link
                        to={`/product/${item.product}`}
                        className="font-medium text-gray-900 hover:text-amber-600"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      <p className="font-semibold text-amber-600">${item.price?.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-xl shadow-card p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Shipping Address</h2>
              <div className="text-gray-600">
                <p className="font-medium text-gray-900">{order.shippingAddress?.fullName}</p>
                <p>{order.shippingAddress?.addressLine1}</p>
                {order.shippingAddress?.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                <p>
                  {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}
                </p>
                <p>{order.shippingAddress?.country}</p>
                {order.shippingAddress?.phone && (
                  <p className="flex items-center gap-2 mt-2 text-sm">
                    <Phone className="w-4 h-4" />
                    {order.shippingAddress.phone}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-card p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${order.pricing?.subtotal?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{order.pricing?.shippingCost === 0 ? 'FREE' : `$${order.pricing?.shippingCost?.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${order.pricing?.tax?.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-amber-600">${order.pricing?.total?.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {order.trackingNumber && (
              <div className="bg-white rounded-xl shadow-card p-6">
                <h2 className="font-semibold text-gray-900 mb-2">Tracking Number</h2>
                <p className="font-mono text-sm">{order.trackingNumber}</p>
              </div>
            )}

            {order.status === 'Processing' && user?.role === 'buyer' && (
              <button
                onClick={handleCancel}
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 font-medium"
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
