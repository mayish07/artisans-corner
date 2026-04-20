import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'chart.js';
import { DollarSign, ShoppingCart, Package, TrendingUp, Calendar } from 'lucide-react';
import { api } from '../services/api';

const COLORS = ['#F59E0B', '#10B981', '#3B82F6', '#EF4444'];

export default function VendorAnalyticsPage() {
  const [stats, setStats] = useState({ revenue: 0, orders: 0, products: 0, visitors: 0 });
  const [salesData, setSalesData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [period, setPeriod] = useState('7d');

  useEffect(() => {
    api.get(`/vendor/analytics?period=${period}`)
      .then(res => {
        setStats(res.data.stats);
        setSalesData(res.data.salesOverTime);
        setTopProducts(res.data.topProducts);
        setOrderStatus(res.data.orderStatus);
      })
      .catch(console.error);
  }, [period]);

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-3xl text-stone-900">Analytics</h1>
          <select
            value={period}
            onChange={e => setPeriod(e.target.value)}
            className="px-4 py-2 rounded-button border border-stone-300"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-product p-6 shadow-card">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-amber-500" />
              <span className="text-stone-500 text-sm">Revenue</span>
            </div>
            <div className="font-serif text-2xl">${stats.revenue.toLocaleString()}</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-product p-6 shadow-card">
            <div className="flex items-center gap-3 mb-2">
              <ShoppingCart className="w-5 h-5 text-amber-500" />
              <span className="text-stone-500 text-sm">Orders</span>
            </div>
            <div className="font-serif text-2xl">{stats.orders}</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-product p-6 shadow-card">
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-5 h-5 text-amber-500" />
              <span className="text-stone-500 text-sm">Products</span>
            </div>
            <div className="font-serif text-2xl">{stats.products}</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-product p-6 shadow-card">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-amber-500" />
              <span className="text-stone-500 text-sm">Visitors</span>
            </div>
            <div className="font-serif text-2xl">{stats.visitors.toLocaleString()}</div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-product p-6 shadow-card">
            <h2 className="font-serif text-lg mb-4">Revenue Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#F59E0B" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-product p-6 shadow-card">
            <h2 className="font-serif text-lg mb-4">Top Products</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProducts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="title" type="category" width={120} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="sold" fill="#F59E0B" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-product p-6 shadow-card">
            <h2 className="font-serif text-lg mb-4">Orders by Status</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={orderStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {orderStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {orderStatus.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-stone-600">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-product p-6 shadow-card">
            <h2 className="font-serif text-lg mb-4">Conversion Rate</h2>
            <div className="text-center py-8">
              <div className="font-serif text-5xl text-amber-500 mb-2">
                {stats.visitors > 0 ? ((stats.orders / stats.visitors) * 100).toFixed(1) : 0}%
              </div>
              <p className="text-stone-500">Visitors to Purchase</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}