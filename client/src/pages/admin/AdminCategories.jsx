import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, Search, Plus, Edit, Trash2, Image, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { api } from '../services/api';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', slug: '', icon: '', image: '' });

  useEffect(() => {
    api.get('/categories')
      .then(res => setCategories(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/admin/categories/${editing}`, form);
        toast.success('Category updated');
      } else {
        await api.post('/admin/categories', form);
        toast.success('Category created');
      }
      const res = await api.get('/categories');
      setCategories(res.data);
      setShowForm(false);
      setEditing(null);
      setForm({ name: '', slug: '', icon: '', image: '' });
    } catch (err) {
      toast.error('Failed to save');
    }
  };

  const handleEdit = (cat) => {
    setEditing(cat._id);
    setForm(cat);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this category?')) return;
    try {
      await api.delete(`/admin/categories/${id}`);
      setCategories(categories.filter(c => c._id !== id));
      toast.success('Category deleted');
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-3xl text-stone-900">Categories</h1>
          <button onClick={() => { setShowForm(true); setEditing(null); setForm({ name: '', slug: '', icon: '', image: '' }); }} className="flex items-center px-4 py-2 bg-amber-500 text-white rounded-button hover:bg-amber-600">
            <Plus className="w-4 h-4 mr-2" /> Add Category
          </button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-white rounded-product p-6 mb-6 shadow-card">
              <h2 className="font-serif text-lg mb-4">{editing ? 'Edit Category' : 'New Category'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }))} required className="px-4 py-3 rounded-button border border-stone-300" />
                  <input type="text" placeholder="Slug URL" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} required className="px-4 py-3 rounded-button border border-stone-300" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Icon (emoji or class)" value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} className="px-4 py-3 rounded-button border border-stone-300" />
                  <input type="text" placeholder="Image URL" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} className="px-4 py-3 rounded-button border border-stone-300" />
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="px-6 py-2 bg-amber-500 text-white rounded-button hover:bg-amber-600">Save</button>
                  <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="px-6 py-2 border border-stone-300 rounded-button hover:bg-stone-50">Cancel</button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-white rounded-product shadow-card overflow-hidden">
          {loading ? (
            <div className="p-8 space-y-4">
              {[1,2,3,4,5].map(i => <div key={i} className="h-16 bg-stone-100 rounded animate-pulse" />)}
            </div>
          ) : categories.length === 0 ? (
            <div className="p-12 text-center text-stone-500"><Folder className="w-12 h-12 mx-auto mb-2 opacity-50" /><p>No categories yet</p></div>
          ) : (
            <div className="divide-y divide-stone-100">
              {categories.map((cat, i) => (
                <motion.div key={cat._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="p-4 flex items-center gap-4 hover:bg-stone-50">
                  {cat.image ? (
                    <img src={cat.image} alt={cat.name} className="w-12 h-12 object-cover rounded" />
                  ) : (
                    <div className="w-12 h-12 bg-stone-100 rounded flex items-center justify-center"><Folder className="w-6 h-6 text-stone-400" /></div>
                  )}
                  <div className="flex-1">
                    <p className="font-medium">{cat.name}</p>
                    <p className="text-stone-500 text-sm">/{cat.slug}</p>
                  </div>
                  <div className="text-stone-500 text-sm">{cat.productCount || 0} products</div>
                  <div className="flex gap-1">
                    <button onClick={() => handleEdit(cat)} className="p-2 text-stone-400 hover:text-stone-600"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(cat._id)} className="p-2 text-red-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
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