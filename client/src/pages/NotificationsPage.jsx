import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bell, Check, CheckCheck, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { api } from '../services/api';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/notifications')
      .then(res => setNotifications(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(notifications.map(n => n._id === id ? { ...n, isRead: true } : n));
    } catch (err) {
      console.error(err);
    }
  };

  const handleReadAll = async () => {
    try {
      await api.put('/notifications/read-all');
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
      toast.success('All notifications marked as read');
    } catch (err) {
      toast.error('Failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notifications/${id}`);
      setNotifications(notifications.filter(n => n._id !== id));
      toast.success('Notification deleted');
    } catch (err) {
      toast.error('Failed');
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-3xl text-stone-900">Notifications</h1>
          {unreadCount > 0 && (
            <button onClick={handleReadAll} className="text-amber-600 hover:text-amber-700 text-sm">
              Mark all as read
            </button>
          )}
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="bg-white rounded-product p-4 animate-pulse">
                <div className="h-4 bg-stone-200 rounded w-1/4 mb-2" />
                <div className="h-3 bg-stone-200 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-product">
            <Bell className="w-16 h-16 text-stone-300 mx-auto mb-4" />
            <h3 className="font-serif text-xl text-stone-600 mb-2">No notifications</h3>
            <p className="text-stone-500">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notif, index) => (
              <motion.div
                key={notif._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => {
                  if (!notif.isRead) handleRead(notif._id);
                  if (notif.link) navigate(notif.link);
                }}
                className={`bg-white rounded-product p-4 shadow-card cursor-pointer hover:shadow-card-hover transition ${
                  !notif.isRead ? 'border-l-4 border-l-amber-500' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    notif.isRead ? 'bg-stone-100' : 'bg-amber-100'
                  }`}>
                    <Bell className={`w-5 h-5 ${notif.isRead ? 'text-stone-400' : 'text-amber-600'}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-stone-900">{notif.title}</h3>
                    <p className="text-stone-600 text-sm">{notif.message}</p>
                    <p className="text-stone-400 text-xs mt-1">
                      {new Date(notif.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(notif._id); }}
                    className="p-2 text-stone-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}