// client/src/pages/SellerDashboard.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMyProducts, createProduct } from '../features/productSlice';
import { getVendorOrders, getVendorStats } from '../features/orderSlice';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function SellerDashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { myProducts } = useSelector((state) => state.products);
  const { vendorOrders, vendorStats } = useSelector((state) => state.orders);
  const [period, setPeriod] = useState('30days');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ title: '', description: '', price: '', category: '', stock: '' });

  useEffect(() => {
    if (user?.role === 'vendor') {
      dispatch(getMyProducts());
      dispatch(getVendorOrders({ limit: 10 }));
      dispatch(getVendorStats(period));
    }
  }, [dispatch, user, period]);

  const handleAddProduct = (e) => {
    e.preventDefault();
    dispatch(createProduct({ ...newProduct, price: Number(newProduct.price), stock: Number(newProduct.stock), images: ['https://via.placeholder.com/400'] }));
    setShowAddProduct(false);
    setNewProduct({ title: '', description: '', price: '', category: '', stock: '' });
  };

  if (user?.role !== 'vendor') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Access Denied</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">You must be a vendor to access this page.</p>
          <Link to="/become-seller" className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700">
            Become a Seller
          </Link>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: vendorStats?.chartData?.map(d => d.date.slice(5)) || [],
    datasets: [{
      label: 'Sales ($)',
      data: vendorStats?.chartData?.map(d => d.sales) || [],
      borderColor: 'rgb(217, 119, 6)',
      backgroundColor: 'rgba(217, 119, 6, 0.1)',
      fill: true,
    }]
  };

  const chartOptions = { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Seller Dashboard</h1>
          <button onClick={() => setShowAddProduct(true)} className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 font-semibold">
            + Add Product
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Total Sales</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">${vendorStats?.totalSales?.toFixed(2) || '0.00'}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Your Earnings</p>
            <p className="text-2xl font-bold text-green-600">${vendorStats?.totalEarnings?.toFixed(2) || '0.00'}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Commission (5%)</p>
            <p className="text-2xl font-bold text-red-500">-${vendorStats?.commission?.toFixed(2) || '0.00'}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{vendorStats?.totalOrders || 0}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Sales Overview</h2>
              <select value={period} onChange={(e) => setPeriod(e.target.value)} className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 dark:bg-gray-700 dark:text-white text-sm">
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
              </select>
            </div>
            <Line data={chartData} options={chartOptions} />
          </div>

          {/* Recent Orders */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Orders</h2>
            <div className="space-y-4">
              {vendorOrders.slice(0, 5).map((order) => (
                <div key={order._id} className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Order #{order._id.slice(-6)}</p>
                    <p className="text-sm text-gray-500">{order.items?.length || 0} items</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">${order.totalAmount?.toFixed(2)}</p>
                    <span className={`text-xs px-2 py-1 rounded ${order.orderStatus === 'delivered' ? 'bg-green-100 text-green-700' : order.orderStatus === 'shipped' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {order.orderStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">My Products</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 dark:text-gray-400 text-sm border-b">
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Price</th>
                  <th className="pb-3">Stock</th>
                  <th className="pb-3">Sales</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {myProducts.map((product) => (
                  <tr key={product._id} className="border-b dark:border-gray-700">
                    <td className="py-4 flex items-center gap-3">
                      <img src={product.images?.[0] || '/placeholder.jpg'} alt="" className="w-12 h-12 object-cover rounded" />
                      <span className="font-medium text-gray-900 dark:text-white">{product.title}</span>
                    </td>
                    <td className="py-4 text-gray-900 dark:text-white">${product.price?.toFixed(2)}</td>
                    <td className="py-4 text-gray-600 dark:text-gray-400">{product.stock}</td>
                    <td className="py-4 text-gray-600 dark:text-gray-400">{product.salesCount || 0}</td>
                    <td className="py-4">
                      <span className={`text-xs px-2 py-1 rounded ${product.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {product.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <input type="text" placeholder="Product Title" value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" required />
              <textarea placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" rows={3} required />
              <div className="grid grid-cols-2 gap-4">
                <input type="number" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" required />
                <input type="number" placeholder="Stock" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" required />
              </div>
              <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" required>
                <option value="">Select Category</option>
                <option value="Jewelry">Jewelry</option>
                <option value="Pottery">Pottery</option>
                <option value="Textiles">Textiles</option>
                <option value="Woodwork">Woodwork</option>
                <option value="Art">Art</option>
              </select>
              <div className="flex gap-4">
                <button type="submit" className="flex-1 bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700">Add Product</button>
                <button type="button" onClick={() => setShowAddProduct(false)} className="flex-1 border border-gray-300 dark:border-gray-600 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
