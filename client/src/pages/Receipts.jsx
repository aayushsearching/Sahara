import { useState, useEffect } from 'react';
import api from '../utils/api';
import StatusBadge from '../components/common/StatusBadge';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Receipts = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/payments/my').then(({ data }) => setPayments(data.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Receipts</h1>
      {payments.length === 0 ? (
        <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-8 text-center text-zinc-500">
          No receipts yet. Payments will appear here once deals are processed.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-zinc-700 text-zinc-400">
                <th className="pb-3 font-medium">Receipt #</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Method</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p._id} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                  <td className="py-3 font-mono text-xs text-zinc-400">{p.receiptNumber}</td>
                  <td className="py-3 text-zinc-400">{new Date(p.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 text-amber-400 font-semibold">₹{p.amount?.toLocaleString()}</td>
                  <td className="py-3 capitalize">{p.type}</td>
                  <td className="py-3 capitalize">{p.method?.replace('_', ' ')}</td>
                  <td className="py-3"><StatusBadge status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Receipts;
