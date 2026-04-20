import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Clock, CheckCircle, AlertCircle, Download, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { api } from '../services/api';

export default function VendorPayoutsPage() {
  const [payouts, setPayouts] = useState([]);
  const [balance, setBalance] = useState({ pending: 0, available: 0 });
  const [loading, setLoading] = useState(true);
  const [bankForm, setBankForm] = useState({ bankName: '', accountNumber: '', routingNumber: '', accountHolder: '' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    api.get('/vendor/payouts')
      .then(res => {
        setPayouts(res.data.payouts);
        setBalance(res.data.balance);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleBankSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/vendor/bank-details', bankForm);
      toast.success('Bank details saved!');
      setShowForm(false);
    } catch (err) {
      toast.error('Failed to save bank details');
    }
  };

  const handlePayoutRequest = async () => {
    if (balance.available < 50) {
      toast.error('Minimum payout is $50');
      return;
    }
    try {
      await api.post('/vendor/request-payout');
      toast.success('Payout requested!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to request payout');
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-serif text-3xl text-stone-900 mb-8">Payouts</h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-product p-6 shadow-card">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-green-500" />
              <span className="text-stone-500 text-sm">Available</span>
            </div>
            <div className="font-serif text-3xl text-green-600">${balance.available.toFixed(2)}</div>
            <button onClick={handlePayoutRequest} className="mt-4 w-full py-2 bg-green-500 text-white rounded-button hover:bg-green-600">
              Request Payout
            </button>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-product p-6 shadow-card">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-amber-500" />
              <span className="text-stone-500 text-sm">Pending</span>
            </div>
            <div className="font-serif text-3xl text-amber-600">${balance.pending.toFixed(2)}</div>
            <p className="text-stone-500 text-sm mt-2">Processing (7 days)</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-product p-6 shadow-card">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-stone-400" />
              <span className="text-stone-500 text-sm">Total Earned</span>
            </div>
            <div className="font-serif text-3xl text-stone-900">${(balance.available + balance.pending).toFixed(2)}</div>
            <button onClick={() => setShowForm(!showForm)} className="mt-4 w-full py-2 border border-amber-500 text-amber-600 rounded-button hover:bg-amber-50">
              {showForm ? 'Cancel' : 'Add Bank'}
            </button>
          </motion.div>
        </div>

        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-product p-6 mb-8 shadow-card">
            <h2 className="font-serif text-lg mb-4">Bank Details</h2>
            <form onSubmit={handleBankSubmit} className="space-y-4">
              <input type="text" placeholder="Bank Name" value={bankForm.bankName} onChange={e => setBankForm(f => ({ ...f, bankName: e.target.value }))} required className="w-full px-4 py-3 rounded-button border border-stone-300" />
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="Account Number" value={bankForm.accountNumber} onChange={e => setBankForm(f => ({ ...f, accountNumber: e.target.value }))} required className="w-full px-4 py-3 rounded-button border border-stone-300" />
                <input type="text" placeholder="Routing Number" value={bankForm.routingNumber} onChange={e => setBankForm(f => ({ ...f, routingNumber: e.target.value }))} required className="w-full px-4 py-3 rounded-button border border-stone-300" />
              </div>
              <input type="text" placeholder="Account Holder Name" value={bankForm.accountHolder} onChange={e => setBankForm(f => ({ ...f, accountHolder: e.target.value }))} required className="w-full px-4 py-3 rounded-button border border-stone-300" />
              <button type="submit" className="px-6 py-3 bg-amber-500 text-white rounded-button hover:bg-amber-600">Save Bank Details</button>
            </form>
          </motion.div>
        )}

        <div className="bg-white rounded-product p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg">Payout History</h2>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[1,2,3,4,5].map(i => <div key={i} className="h-12 bg-stone-100 rounded animate-pulse" />)}
            </div>
          ) : payouts.length === 0 ? (
            <div className="text-center py-12 text-stone-500">No payouts yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-stone-200">
                    <th className="text-left py-3 text-stone-500 text-sm">Date</th>
                    <th className="text-left py-3 text-stone-500 text-sm">Amount</th>
                    <th className="text-left py-3 text-stone-500 text-sm">Status</th>
                    <th className="text-left py-3 text-stone-500 text-sm">Method</th>
                  </tr>
                </thead>
                <tbody>
                  {payouts.map((payout, i) => (
                    <tr key={i} className="border-b border-stone-100">
                      <td className="py-3">{new Date(payout.createdAt).toLocaleDateString()}</td>
                      <td className="py-3 font-medium">${payout.amount.toFixed(2)}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          payout.status === 'completed' ? 'bg-green-100 text-green-700' :
                          payout.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {payout.status}
                        </span>
                      </td>
                      <td className="py-3 text-stone-600">Bank Transfer</td>
                    </tr>
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