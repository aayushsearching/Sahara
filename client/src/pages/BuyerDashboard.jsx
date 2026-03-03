import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import StatusBadge from '../components/common/StatusBadge';
import LoadingSpinner from '../components/common/LoadingSpinner';

const BuyerDashboard = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/buyer/enquiry').then(({ data }) => setEnquiries(data.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  const pending = enquiries.filter((e) => e.status === 'pending').length;
  const matched = enquiries.filter((e) => e.status === 'matched' || e.status === 'deal_closed').length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Buyer Dashboard</h1>
        <Link to="/buyer/enquiry/new" className="bg-amber-500 text-zinc-900 px-4 py-2 rounded text-sm font-medium hover:bg-amber-400 transition">
          + New Enquiry
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Enquiries', value: enquiries.length },
          { label: 'Pending', value: pending },
          { label: 'Matched', value: matched },
        ].map((s) => (
          <div key={s.label} className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
            <div className="text-2xl font-bold text-amber-500">{s.value}</div>
            <div className="text-sm text-zinc-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Enquiries */}
      <h2 className="text-lg font-semibold mb-4">Recent Enquiries</h2>
      {enquiries.length === 0 ? (
        <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-8 text-center text-zinc-500">
          No enquiries yet. Submit your first property requirement.
        </div>
      ) : (
        <div className="space-y-3">
          {enquiries.slice(0, 10).map((eq) => (
            <div key={eq._id} className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-zinc-100 font-medium capitalize">{eq.propertyType}</span>
                  <StatusBadge status={eq.status} />
                </div>
                <div className="text-sm text-zinc-400 mt-1">
                  {eq.desiredArea} {eq.areaUnit} &middot; {eq.city} &middot; ₹{eq.budgetMin?.toLocaleString()} - ₹{eq.budgetMax?.toLocaleString()}
                </div>
              </div>
              <div className="text-xs text-zinc-500">{new Date(eq.createdAt).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BuyerDashboard;
