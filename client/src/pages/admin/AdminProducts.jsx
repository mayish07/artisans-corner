import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Search, Star, Eye, Edit, Trash2, ToggleLeft, ToggleRight, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    api.get(`/admin/products?search=${search}&status=${statusFilter}`)
      .then(res => setProducts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [search, statusFilter]);

  const handleToggle = async (productId, isPublished) => {
    try {
      await api.put(`/admin/products/${productId}/toggle`, { published: !isPublished });
      setProducts(products.map(p => p._id === productId ? { ...p, isPublished: !isPublished } : p));
      toast.success(isPublished ? 'Product unpublished' : 'Product published');
    } catch (err) {
      toast.error('Failed');
    }
  };

  const handleFeature = async (productId, isFeatured) => {
    try {
      await api.put(`/admin/products/${productId}/feature`, { featured: !isFeatured });
      setProducts(products.map(p => p._id === productId ? { ...p, isFeatured: !isFeatured } : p));
      toast.success(isFeatured ? 'Removed from featured' : 'Added to featured');
    } catch (err) {
      toast.error('Failed');
    }
  };

  const handleDelete = async (productId) => {
    if (!confirm('Delete this product?')) return;
    try {
      await api.delete(`/admin/products/${productId}`);
      setProducts(products.filter(p => p._id !== productId));
      toast.success('Product deleted');
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-serif text-3xl text-stone-900 mb-8">Products</h1>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-button border border-stone-300" />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-4 py-2.5 rounded-button border border-stone-300">
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="featured">Featured</option>
          </select>
        </div>

        <div className="bg-white rounded-product shadow-card overflow-hidden">
          {loading ? (
            <div className="p-8 space-y-4">
              {[1,2,3,4,5].map(i => <div key={i} className="h-20 bg-stone-100 rounded animate-pulse" />)}
            </div>
          ) : products.length === 0 ? (
            <div className="p-12 text-center text-stone-500"><Package className="w-12 h-12 mx-auto mb-2 opacity-50" /><p>No products found</p></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-stone-50">
                  <tr>
                    <th className="text-left px-6 py-3 text-stone-500 text-sm font-medium">Product</th>
                    <th className="text-left px-6 py-3 text-stone-500 text-sm font-medium">Store</th>
                    <th className="text-left px-6 py-3 text-stone-500 text-sm font-medium">Price</th>
                    <th className="text-left px-6 py-3 text-stone-500 text-sm font-medium">Stock</th>
                    <th className="text-left px-6 py-3 text-stone-500 text-sm font-medium">Status</th>
                    <th className="text-left px-6 py-3 text-stone-500 text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {products.map((product, i) => (
                    <motion.tr key={product._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-stone-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-stone-100 rounded overflow-hidden">
                            {product.images?.[0] ? <img src={product.images[0].url} alt="" className="w-full h-full object-cover" /> : <Package className="w-6 h-6 text-stone-300 m-auto" />}
                          </div>
                          <Link to={`/product/${product.slug}`} className="font-medium hover:text-amber-600">{product.title}</Link>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-stone-600">{product.store?.name}</td>
                      <td className="px-6 py-4 font-medium">${product.price}</td>
                      <td className="px-6 py-4">{product.inventory || 0}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {product.isFeatured && <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full flex items-center gap-1"><Sparkles className="w-3 h-3" /> Featured</span>}
                          {product.isPublished ? <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">Published</span> : <span className="px-2 py-0.5 bg-stone-100 text-stone-600 text-xs rounded-full">Draft</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          <Link to={`/product/${product.slug}`} className="p-2 text-stone-400 hover:text-stone-600"><Eye className="w-4 h-4" /></Link>
                          <button onClick={() => handleToggle(product._id, product.isPublished)} className={`p-2 ${product.isPublished ? 'text-amber-500' : 'text-green-500'}`}>
                            {product.isPublished ? <ToggleLeft className="w-4 h-4" /> : <ToggleRight className="w-4 h-4" />}
                          </button>
                          <button onClick={() => handleFeature(product._id, product.isFeatured)} className={`p-2 ${product.isFeatured ? 'text-amber-500' : 'text-stone-400'}`}>
                            <Sparkles className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(product._id)} className="p-2 text-red-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}