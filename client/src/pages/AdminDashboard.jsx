import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVendors: 0,
    totalProducts: 0,
    totalOrders: 0,
    revenue: 0,
    pendingVendors: []
  });
  const [period, setPeriod] = useState('30days');

  useEffect(() => {
    // Fetch admin stats (mock for now)
    setStats({
      totalUsers: 150,
      totalVendors: 25,
      totalProducts: 450,
      totalOrders: 320,
      revenue: 45000,
      pendingVendors: []
    });
  }, [dispatch]);

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Access Denied</h2>
          <p className="text-gray-600 dark:text-gray-400">Admin access required.</p>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue ($)',
      data: [5000, 7500, 6200, 8900, 11000, 9500],
      borderColor: 'rgb(239, 68, 68)',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      fill: true,
    }]
  };

  const chartOptions = { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Total Users</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalUsers}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Total Vendors</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalVendors}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Total Products</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalProducts}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Platform Revenue</p>
            <p className="text-2xl font-bold text-green-600">${stats.revenue.toFixed(2)}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Overview</h2>
              <select value={period} onChange={(e) => setPeriod(e.target.value)} className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 dark:bg-gray-700 dark:text-white text-sm">
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
              </select>
            </div>
            <Line data={chartData} options={chartOptions} />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Orders</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Order #123456</p>
                  <p className="text-sm text-gray-500">3 items</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">$89.99</p>
                  <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">Completed</span>
                </div>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Order #123457</p>
                  <p className="text-sm text-gray-500">1 item</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">$45.00</p>
                  <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">Shipped</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
