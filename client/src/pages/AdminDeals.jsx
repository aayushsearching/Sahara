import { useState, useEffect } from 'react';
import api from '../utils/api';
import StatusBadge from '../components/common/StatusBadge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const AdminDeals = () => {
  const [deals, setDeals] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ buyerEnquiry: '', sellerListing: '', agreedPrice: '', commissionRate: '2', notes: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      const [d, e, l] = await Promise.all([
        api.get('/deals'),
        api.get('/admin/enquiries'),
        api.get('/admin/listings'),
      ]);
      setDeals(d.data.data);
      setEnquiries(e.data.data.filter((eq) => eq.status === 'pending' || eq.status === 'in_progress'));
      setListings(l.data.data.filter((li) => li.status === 'active'));
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/deals', form);
      toast.success('Deal created!');
      setForm({ buyerEnquiry: '', sellerListing: '', agreedPrice: '', commissionRate: '2', notes: '' });
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    } finally {
      setSubmitting(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/deals/${id}`, { status });
      toast.success('Status updated');
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  if (loading) return <LoadingSpinner />;

  const inputCls = "w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500";

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Deal Management</h1>

      {/* Create Deal */}
      <form onSubmit={handleCreate} className="bg-zinc-800 border border-zinc-700 rounded-lg p-6 mb-8 space-y-4">
        <h2 className="text-lg font-semibold">Create New Deal</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Buyer Enquiry</label>
            <select value={form.buyerEnquiry} onChange={(e) => setForm({ ...form, buyerEnquiry: e.target.value })} required className={inputCls}>
              <option value="">Select enquiry...</option>
              {enquiries.map((eq) => (
                <option key={eq._id} value={eq._id}>{eq.buyer?.name} - {eq.propertyType} in {eq.city} (₹{eq.budgetMin?.toLocaleString()}-₹{eq.budgetMax?.toLocaleString()})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Seller Listing</label>
            <select value={form.sellerListing} onChange={(e) => setForm({ ...form, sellerListing: e.target.value })} required className={inputCls}>
              <option value="">Select listing...</option>
              {listings.map((l) => (
                <option key={l._id} value={l._id}>{l.seller?.name} - {l.propertyType} in {l.city} (₹{l.askingPrice?.toLocaleString()})</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Agreed Price (₹)</label>
            <input type="number" value={form.agreedPrice} onChange={(e) => setForm({ ...form, agreedPrice: e.target.value })} required placeholder="e.g. 4500000" className={inputCls} />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Commission Rate (%)</label>
            <input type="number" step="0.1" value={form.commissionRate} onChange={(e) => setForm({ ...form, commissionRate: e.target.value })} required className={inputCls} />
          </div>
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Notes</label>
          <input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Optional notes..." className={inputCls} />
        </div>
        <button type="submit" disabled={submitting} className="bg-amber-500 text-zinc-900 font-medium px-6 py-2 rounded hover:bg-amber-400 transition disabled:opacity-50">
          {submitting ? 'Creating...' : 'Create Deal'}
        </button>
      </form>

      {/* Deals List */}
      <h2 className="text-lg font-semibold mb-4">All Deals</h2>
      {deals.length === 0 ? (
        <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-8 text-center text-zinc-500">No deals yet.</div>
      ) : (
        <div className="space-y-4">
          {deals.map((d) => (
            <div key={d._id} className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <StatusBadge status={d.status} />
                    <span className="text-amber-500 font-semibold">₹{d.agreedPrice?.toLocaleString()}</span>
                    <span className="text-xs text-zinc-500">({d.commissionRate}% = ₹{d.commissionAmount?.toLocaleString()} commission)</span>
                  </div>
                  <div className="text-sm text-zinc-400">
                    <span className="text-zinc-300">Buyer:</span> {d.buyer?.name} ({d.buyer?.phone}) &middot;{' '}
                    <span className="text-zinc-300">Seller:</span> {d.seller?.name} ({d.seller?.phone})
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">{new Date(d.createdAt).toLocaleDateString()}</div>
                </div>
                <select
                  value={d.status}
                  onChange={(e) => updateStatus(d._id, e.target.value)}
                  className="bg-zinc-700 border border-zinc-600 rounded px-2 py-1 text-xs text-zinc-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="initiated">Initiated</option>
                  <option value="negotiation">Negotiation</option>
                  <option value="agreement">Agreement</option>
                  <option value="payment_pending">Payment Pending</option>
                  <option value="closed">Closed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDeals;
