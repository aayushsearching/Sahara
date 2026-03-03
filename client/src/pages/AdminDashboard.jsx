import { useState, useEffect } from 'react';
import api from '../utils/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/stats').then(({ data }) => setStats(data.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  const cards = [
    { label: 'Total Users', value: stats?.users || 0 },
    { label: 'Buyer Enquiries', value: stats?.enquiries || 0 },
    { label: 'Seller Listings', value: stats?.listings || 0 },
    { label: 'Active Deals', value: stats?.deals || 0 },
    { label: 'Revenue', value: `₹${(stats?.revenue || 0).toLocaleString()}` },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
            <div className="text-2xl font-bold text-amber-500">{c.value}</div>
            <div className="text-sm text-zinc-400 mt-1">{c.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
