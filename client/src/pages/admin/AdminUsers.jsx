import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Store, Package, DollarSign, Shield, Search, MoreVertical, UserPlus, Ban, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { api } from '../services/api';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  useEffect(() => {
    api.get(`/admin/users?search=${search}&role=${roleFilter}`)
      .then(res => setUsers(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [search, roleFilter]);

  const handleRoleChange = async (userId, role) => {
    try {
      await api.put(`/admin/users/${userId}/role`, { role });
      setUsers(users.map(u => u._id === userId ? { ...u, role } : u));
      toast.success('Role updated');
    } catch (err) {
      toast.error('Failed to update role');
    }
  };

  const handleBan = async (userId, banned) => {
    try {
      await api.put(`/admin/users/${userId}/ban`, { banned: !banned });
      setUsers(users.map(u => u._id === userId ? { ...u, isBanned: !banned } : u));
      toast.success(banned ? 'User unbanned' : 'User banned');
    } catch (err) {
      toast.error('Failed');
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-3xl text-stone-900">Users</h1>
          <button className="flex items-center px-4 py-2 bg-amber-500 text-white rounded-button hover:bg-amber-600">
            <UserPlus className="w-4 h-4 mr-2" /> Add User
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-button border border-stone-300"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2.5 rounded-button border border-stone-300"
          >
            <option value="">All Roles</option>
            <option value="buyer">Buyers</option>
            <option value="vendor">Vendors</option>
            <option value="admin">Admins</option>
          </select>
        </div>

        <div className="bg-white rounded-product shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-stone-50">
                <tr>
                  <th className="text-left px-6 py-3 text-stone-500 text-sm font-medium">User</th>
                  <th className="text-left px-6 py-3 text-stone-500 text-sm font-medium">Email</th>
                  <th className="text-left px-6 py-3 text-stone-500 text-sm font-medium">Role</th>
                  <th className="text-left px-6 py-3 text-stone-500 text-sm font-medium">Joined</th>
                  <th className="text-left px-6 py-3 text-stone-500 text-sm font-medium">Status</th>
                  <th className="text-left px-6 py-3 text-stone-500 text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="border-t border-stone-100">
                      <td colSpan={6} className="px-6 py-4"><div className="h-6 bg-stone-100 rounded animate-pulse" /></td>
                    </tr>
                  ))
                ) : users.length === 0 ? (
                  <tr className="border-t border-stone-100">
                    <td colSpan={6} className="px-6 py-12 text-center text-stone-500">No users found</td>
                  </tr>
                ) : users.map((user, i) => (
                  <motion.tr key={user._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-t border-stone-100 hover:bg-stone-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center overflow-hidden">
                          {user.avatar ? <img src={user.avatar} alt="" className="w-full h-full object-cover" /> : <Users className="w-5 h-5 text-stone-400" />}
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-stone-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className="px-2 py-1 rounded border border-stone-200 text-sm bg-white"
                      >
                        <option value="buyer">Buyer</option>
                        <option value="vendor">Vendor</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-stone-600">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      {user.isBanned ? (
                        <span className="flex items-center gap-1 text-red-600"><Ban className="w-4 h-4" /> Banned</span>
                      ) : (
                        <span className="flex items-center gap-1 text-green-600"><CheckCircle className="w-4 h-4" /> Active</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleBan(user._id, user.isBanned)}
                        className={`p-2 rounded hover:bg-stone-100 ${user.isBanned ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {user.isBanned ? <CheckCircle className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}