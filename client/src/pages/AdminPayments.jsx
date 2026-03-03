import { useState, useEffect } from 'react';
import api from '../utils/api';
import StatusBadge from '../components/common/StatusBadge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ deal: '', paidBy: '', amount: '', type: 'commission', method: 'bank_transfer', notes: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      const [p, d] = await Promise.all([api.get('/payments/all'), api.get('/deals')]);
      setPayments(p.data.data);
      setDeals(d.data.data);
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const selectedDeal = deals.find((d) => d._id === form.deal);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/payments', form);
      toast.success('Payment recorded!');
      setForm({ deal: '', paidBy: '', amount: '', type: 'commission', method: 'bank_transfer', notes: '' });
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  const inputCls = "w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500";

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Payment Management</h1>

      <form onSubmit={handleSubmit} className="bg-zinc-800 border border-zinc-700 rounded-lg p-6 mb-8 space-y-4">
        <h2 className="text-lg font-semibold">Record Payment</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Deal</label>
            <select value={form.deal} onChange={(e) => setForm({ ...form, deal: e.target.value, paidBy: '' })} required className={inputCls}>
              <option value="">Select deal...</option>
              {deals.map((d) => (
                <option key={d._id} value={d._id}>{d.buyer?.name} &lt;&gt; {d.seller?.name} (₹{d.agreedPrice?.toLocaleString()})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Paid By</label>
            <select value={form.paidBy} onChange={(e) => setForm({ ...form, paidBy: e.target.value })} required className={inputCls}>
              <option value="">Select user...</option>
              {selectedDeal && (
                <>
                  <option value={selectedDeal.buyer?._id}>{selectedDeal.buyer?.name} (Buyer)</option>
                  <option value={selectedDeal.seller?._id}>{selectedDeal.seller?.name} (Seller)</option>
                </>
              )}
            </select>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Amount (₹)</label>
            <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required className={inputCls} />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Type</label>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={inputCls}>
              <option value="commission">Commission</option>
              <option value="booking">Booking</option>
              <option value="advance">Advance</option>
              <option value="final">Final</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Method</label>
            <select value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })} className={inputCls}>
              <option value="cash">Cash</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="upi">UPI</option>
              <option value="cheque">Cheque</option>
            </select>
          </div>
        </div>
        <button type="submit" disabled={submitting} className="bg-amber-500 text-zinc-900 font-medium px-6 py-2 rounded hover:bg-amber-400 transition disabled:opacity-50">
          {submitting ? 'Recording...' : 'Record Payment'}
        </button>
      </form>

      <h2 className="text-lg font-semibold mb-4">All Payments</h2>
      {payments.length === 0 ? (
        <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-8 text-center text-zinc-500">No payments yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-zinc-700 text-zinc-400">
                <th className="pb-3 font-medium">Receipt #</th>
                <th className="pb-3 font-medium">Paid By</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Method</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p._id} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                  <td className="py-3 text-xs font-mono text-zinc-400">{p.receiptNumber}</td>
                  <td className="py-3">{p.paidBy?.name || 'N/A'}</td>
                  <td className="py-3 text-amber-400">₹{p.amount?.toLocaleString()}</td>
                  <td className="py-3 capitalize">{p.type}</td>
                  <td className="py-3 capitalize">{p.method?.replace('_', ' ')}</td>
                  <td className="py-3"><StatusBadge status={p.status} /></td>
                  <td className="py-3 text-zinc-500">{new Date(p.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPayments;
