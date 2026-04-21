import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MapPin, Trash2, Edit, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ label: '', street: '', city: '', state: '', zip: '', country: 'US' });

  useEffect(() => {
    api.get('/user/addresses')
      .then(res => setAddresses(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/user/addresses/${editing}`, form);
        toast.success('Address updated!');
      } else {
        await api.post('/user/addresses', form);
        toast.success('Address added!');
      }
      const res = await api.get('/user/addresses');
      setAddresses(res.data);
      setShowForm(false);
      setEditing(null);
      setForm({ label: '', street: '', city: '', state: '', zip: '', country: 'US' });
    } catch (err) {
      toast.error('Failed to save address');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this address?')) return;
    try {
      await api.delete(`/user/addresses/${id}`);
      setAddresses(addresses.filter(a => a._id !== id));
      toast.success('Address deleted');
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await api.put(`/user/addresses/${id}/default`);
      setAddresses(addresses.map(a => ({ ...a, isDefault: a._id === id })));
      toast.success('Default address updated');
    } catch (err) {
      toast.error('Failed to set default');
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-3xl text-stone-900">My Addresses</h1>
          <button
            onClick={() => { setShowForm(true); setEditing(null); setForm({ label: '', street: '', city: '', state: '', zip: '', country: 'US' }); }}
            className="flex items-center px-4 py-2 bg-amber-500 text-white rounded-button hover:bg-amber-600"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Address
          </button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-product p-6 mb-6 shadow-card"
            >
              <h2 className="font-serif text-xl mb-4">{editing ? 'Edit Address' : 'New Address'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Label (e.g., Home, Work)"
                    value={form.label}
                    onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
                    required
                    className="px-4 py-3 rounded-button border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
                  />
                  <select
                    value={form.country}
                    onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                    className="px-4 py-3 rounded-button border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Street Address"
                  value={form.street}
                  onChange={e => setForm(f => ({ ...f, street: e.target.value }))}
                  required
                  className="w-full px-4 py-3 rounded-button border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
                />
                <div className="grid md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    value={form.city}
                    onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                    required
                    className="px-4 py-3 rounded-button border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={form.state}
                    onChange={e => setForm(f => ({ ...f, state: e.target.value }))}
                    required
                    className="px-4 py-3 rounded-button border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    value={form.zip}
                    onChange={e => setForm(f => ({ ...f, zip: e.target.value }))}
                    required
                    className="px-4 py-3 rounded-button border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
                  />
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="px-6 py-2 bg-amber-500 text-white rounded-button hover:bg-amber-600">
                    {editing ? 'Update' : 'Save'} Address
                  </button>
                  <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="px-6 py-2 border border-stone-300 rounded-button hover:bg-stone-50">
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white rounded-product p-6 animate-pulse">
                <div className="h-4 bg-stone-200 rounded w-1/4 mb-2" />
                <div className="h-3 bg-stone-200 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : addresses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-product">
            <MapPin className="w-16 h-16 text-stone-300 mx-auto mb-4" />
            <h3 className="font-serif text-xl text-stone-600 mb-2">No addresses yet</h3>
            <p className="text-stone-500 mb-4">Add an address for faster checkout</p>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((addr, index) => (
              <motion.div
                key={addr._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white rounded-product p-6 shadow-card ${addr.isDefault ? 'ring-2 ring-amber-500' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-serif text-lg">{addr.label}</h3>
                      {addr.isDefault && (
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">Default</span>
                      )}
                    </div>
                    <p className="text-stone-600">{addr.street}</p>
                    <p className="text-stone-600">{addr.city}, {addr.state} {addr.zip}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSetDefault(addr._id)}
                      className={`p-2 rounded-button ${addr.isDefault ? 'bg-amber-100 text-amber-600' : 'text-stone-400 hover:text-stone-600'}`}
                      title="Set as default"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => { setEditing(addr._id); setForm(addr); setShowForm(true); }}
                      className="p-2 text-stone-400 hover:text-stone-600"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(addr._id)}
                      className="p-2 text-stone-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}