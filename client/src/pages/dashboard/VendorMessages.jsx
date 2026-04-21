import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, User, Search, Clock, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

export default function VendorMessagesPage() {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/vendor/messages')
      .then(res => {
        setThreads(res.data.threads);
        if (res.data.threads.length > 0) setSelectedThread(res.data.threads[0]);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedThread) {
      api.get(`/vendor/messages/${selectedThread._id}`)
        .then(res => setMessages(res.data))
        .catch(console.error);
    }
  }, [selectedThread]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedThread) return;
    try {
      const res = await api.post(`/vendor/messages/${selectedThread._id}`, { message: newMessage });
      setMessages(res.data);
      setNewMessage('');
    } catch (err) {
      toast.error('Failed to send');
    }
  };

  const handleMarkRead = async (threadId) => {
    try {
      await api.put(`/vendor/messages/${threadId}/read`);
      setThreads(threads.map(t => t._id === threadId ? { ...t, unread: 0 } : t));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif text-3xl text-stone-900 mb-8">Messages</h1>

        <div className="grid md:grid-cols-3 gap-6 bg-white rounded-product shadow-card overflow-hidden" style={{ height: '600px' }}>
          <div className="border-r border-stone-200 overflow-y-auto">
            <div className="p-4 border-b border-stone-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input type="text" placeholder="Search..." className="w-full pl-9 pr-3 py-2 rounded-button border border-stone-200 text-sm" />
              </div>
            </div>
            {loading ? (
              <div className="p-4 space-y-3">
                {[1,2,3].map(i => <div key={i} className="h-16 bg-stone-100 rounded animate-pulse" />)}
              </div>
            ) : threads.length === 0 ? (
              <div className="p-8 text-center text-stone-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No messages yet</p>
              </div>
            ) : (
              <div>
                {threads.map(thread => (
                  <button
                    key={thread._id}
                    onClick={() => { setSelectedThread(thread); handleMarkRead(thread._id); }}
                    className={`w-full p-4 text-left border-b border-stone-100 hover:bg-stone-50 ${
                      selectedThread?._id === thread._id ? 'bg-amber-50 border-l-4 border-l-amber-500' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-stone-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium truncate">{thread.buyer?.name}</p>
                          {thread.unread > 0 && (
                            <span className="w-5 h-5 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center">
                              {thread.unread}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-stone-500 truncate">{thread.lastMessage}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="md:col-span-2 flex flex-col">
            {selectedThread ? (
              <>
                <div className="p-4 border-b border-stone-200 bg-stone-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-stone-500" />
                    </div>
                    <div>
                      <p className="font-medium">{selectedThread.buyer?.name}</p>
                      <p className="text-sm text-stone-500">{selectedThread.product?.title}</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.fromBuyer ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-[70%] p-3 rounded-product ${
                        msg.fromBuyer ? 'bg-stone-100' : 'bg-amber-500 text-white'
                      }`}>
                        <p className="text-sm">{msg.message}</p>
                        <p className={`text-xs mt-1 ${msg.fromBuyer ? 'text-stone-500' : 'text-amber-200'}`}>
                          {new Date(msg.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSend} className="p-4 border-t border-stone-200">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={e => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 rounded-button border border-stone-300"
                    />
                    <button type="submit" className="px-4 py-2 bg-amber-500 text-white rounded-button hover:bg-amber-600">
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-stone-500">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p>Select a conversation</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}