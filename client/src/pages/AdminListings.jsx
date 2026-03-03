import { useState, useEffect } from 'react';
import api from '../utils/api';
import StatusBadge from '../components/common/StatusBadge';
import LoadingSpinner from '../components/common/LoadingSpinner';

const AdminListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/listings').then(({ data }) => setListings(data.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">All Seller Listings</h1>
      {listings.length === 0 ? (
        <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-8 text-center text-zinc-500">No listings yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-zinc-700 text-zinc-400">
                <th className="pb-3 font-medium">Seller</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Location</th>
                <th className="pb-3 font-medium">Area</th>
                <th className="pb-3 font-medium">Price</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((l) => (
                <tr key={l._id} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                  <td className="py-3">
                    <div className="text-zinc-100">{l.seller?.name}</div>
                    <div className="text-xs text-zinc-500">{l.seller?.phone}</div>
                  </td>
                  <td className="py-3 capitalize">{l.propertyType}</td>
                  <td className="py-3">{l.locality}, {l.city}</td>
                  <td className="py-3">{l.area} {l.areaUnit}</td>
                  <td className="py-3 text-amber-400">₹{l.askingPrice?.toLocaleString()}</td>
                  <td className="py-3"><StatusBadge status={l.status} /></td>
                  <td className="py-3 text-zinc-500">{new Date(l.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminListings;
