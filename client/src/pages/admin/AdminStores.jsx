import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Store, Search, CheckCircle, XCircle, Ban, Eye, Package, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

export default function AdminStoresPage() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    api.get(`/admin/stores?search=${search}&status=${statusFilter}`)
      .then(res => setStores(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [search, statusFilter]);

  const handleApprove = async (storeId, approved) => {
    try {
      await api.put(`/admin/stores/${storeId}/approve`, { approved: !approved });
      setStores(stores.map(s => s._id === storeId ? { ...s, isApproved: !approved } : s));
      toast.success(approved ? 'Store rejected' : 'Store approved');
    } catch (err) {
      toast.error('Failed');
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-serif text-3xl text-stone-900 mb-8">Stores</h1>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input type="text" placeholder="Search stores..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-button border border-stone-300" />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-4 py-2.5 rounded-button border border-stone-300">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        <div className="bg-white rounded-product shadow-card overflow-hidden">
          {loading ? (
            <div className="p-8 space-y-4">
              {[1,2,3,4,5].map(i => <div key={i} className="h-20 bg-stone-100 rounded animate-pulse" />)}
            </div>
          ) : stores.length === 0 ? (
            <div className="p-12 text-center text-stone-500"><Store className="w-12 h-12 mx-auto mb-2 opacity-50" /><p>No stores found</p></div>
          ) : (
            <div className="divide-y divide-stone-100">
              {stores.map((store, i) => (
                <motion.div key={store._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="p-6 flex items-center gap-6 hover:bg-stone-50">
                  <div className="w-16 h-16 bg-stone-100 rounded-product overflow-hidden flex-shrink-0">
                    {store.logo ? <img src={store.logo} alt="" className="w-full h-full object-cover" /> : <Store className="w-8 h-8 text-stone-300 m-auto" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Link to={`/store/${store.slug}`} className="font-serif text-lg hover:text-amber-600">{store.name}</Link>
                      {store.isApproved ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-amber-500" />}
                    </div>
                    <p className="text-stone-500 text-sm truncate">{store.description}</p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-stone-500">
                      <span className="flex items-center gap-1"><Star className="w-4 h-4" /> {store.rating?.toFixed(1) || 'New'}</span>
                      <span className="flex items-center gap-1"><Package className="w-4 h-4" /> {store.totalSales || 0} sales</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/store/${store.slug}`} className="p-2 text-stone-400 hover:text-stone-600"><Eye className="w-5 h-5" /></Link>
                    <button onClick={() => handleApprove(store._id, store.isApproved)} className={`p-2 ${store.isApproved ? 'text-red-500 hover:text-red-600' : 'text-green-500 hover:text-green-600'}`}>
                      {store.isApproved ? <Ban className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}