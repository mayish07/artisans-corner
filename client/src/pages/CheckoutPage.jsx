// client/src/pages/CheckoutPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../features/cartSlice';
import { createPaymentIntent, confirmPayment } from '../features/orderSlice';
import { clearCartState } from '../features/cartSlice';
import { formatPrice } from '../utils/formatCurrency';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, subtotal } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { paymentIntent, currentOrder } = useSelector((state) => state.orders);
  const [step, setStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState({ fullName: '', line1: '', city: '', state: '', zip: '', country: 'United States' });
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCart());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (currentOrder) {
      navigate(`/order-confirmation/${currentOrder._id}`);
      dispatch(clearCartState());
    }
  }, [currentOrder, navigate, dispatch]);

  const cartItems = items.filter(item => !item.savedForLater);

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'SAVE10') {
      setDiscount(subtotal * 0.1);
    }
  };

  const handleCreatePaymentIntent = async () => {
    const result = await dispatch(createPaymentIntent({ couponCode: couponCode || null }));
    if (result.payload?.clientSecret) {
      setStep(3);
    }
  };

  const handleConfirmPayment = async () => {
    await dispatch(confirmPayment({
      paymentIntentId: paymentIntent.paymentIntentId,
      shippingAddress,
      couponCode: couponCode || null
    }));
  };

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const total = subtotal - discount + (subtotal > 50 ? 0 : 5.99);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Checkout</h1>

        {/* Steps */}
        <div className="flex justify-center mb-8">
          {['Cart', 'Shipping', 'Payment', 'Confirm'].map((label, i) => (
            <div key={label} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step > i + 1 ? 'bg-green-500' : step === i + 1 ? 'bg-amber-600' : 'bg-gray-300'} text-white font-bold`}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span className={`ml-2 ${step === i + 1 ? 'text-amber-600 font-semibold' : 'text-gray-500'}`}>{label}</span>
              {i < 3 && <div className="w-16 h-0.5 bg-gray-300 mx-4" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Review Your Cart</h2>
                {cartItems.map((item) => (
                  <div key={item._id} className="flex gap-4 py-4 border-b dark:border-gray-700">
                    <img src={item.image || '/placeholder.jpg'} alt="" className="w-20 h-20 object-cover rounded" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
                      <p className="text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-900 dark:text-white">formatPrice(item.subtotal)</p>
                  </div>
                ))}
                <button onClick={() => setStep(2)} className="w-full bg-amber-600 text-white py-3 rounded-lg mt-6 hover:bg-amber-700">
                  Continue to Shipping
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <input type="text" placeholder="Full Name" value={shippingAddress.fullName} onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" required />
                  <input type="text" placeholder="Address Line 1" value={shippingAddress.line1} onChange={(e) => setShippingAddress({ ...shippingAddress, line1: e.target.value })} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" required />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="City" value={shippingAddress.city} onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" required />
                    <input type="text" placeholder="State" value={shippingAddress.state} onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="ZIP Code" value={shippingAddress.zip} onChange={(e) => setShippingAddress({ ...shippingAddress, zip: e.target.value })} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" required />
                    <input type="text" placeholder="Country" value={shippingAddress.country} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <button onClick={() => setStep(1)} className="flex-1 border border-gray-300 dark:border-gray-600 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Back</button>
                  <button onClick={handleCreatePaymentIntent} className="flex-1 bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700">Continue to Payment</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Payment</h2>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
                  <p className="text-sm text-gray-500 mb-2">Payment Amount</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">formatPrice(paymentIntent?.amount || total)</p>
                  <p className="text-sm text-gray-500 mt-2">This is a demo. No real payment will be processed.</p>
                </div>
                <div className="flex gap-4 mt-6">
                  <button onClick={() => setStep(2)} className="flex-1 border border-gray-300 dark:border-gray-600 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Back</button>
                  <button onClick={handleConfirmPayment} className="flex-1 bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700">Complete Order</button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>formatPrice(subtotal)</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>{subtotal > 50 ? 'Free' : '$5.99'}</span></div>
                {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-${discount.toFixed(2)}</span></div>}
              </div>
              <div className="border-t dark:border-gray-700 mt-4 pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-amber-600">formatPrice(total)</span>
              </div>
              <div className="mt-4">
                <div className="flex gap-2">
                  <input type="text" placeholder="Coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white text-sm" />
                  <button onClick={handleApplyCoupon} className="bg-gray-200 dark:bg-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-gray-500">Apply</button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Try: SAVE10</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
