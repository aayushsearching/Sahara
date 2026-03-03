import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import StatusBadge from '../components/common/StatusBadge';
import LoadingSpinner from '../components/common/LoadingSpinner';

const SellerDashboard = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/seller/listing').then(({ data }) => setListings(data.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  const active = listings.filter((l) => l.status === 'active').length;
  const sold = listings.filter((l) => l.status === 'sold').length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Seller Dashboard</h1>
        <Link to="/seller/listing/new" className="bg-amber-500 text-zinc-900 px-4 py-2 rounded text-sm font-medium hover:bg-amber-400 transition">
          + New Listing
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Listings', value: listings.length },
          { label: 'Active', value: active },
          { label: 'Sold', value: sold },
        ].map((s) => (
          <div key={s.label} className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
            <div className="text-2xl font-bold text-amber-500">{s.value}</div>
            <div className="text-sm text-zinc-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-semibold mb-4">My Listings</h2>
      {listings.length === 0 ? (
        <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-8 text-center text-zinc-500">
          No listings yet. Publish your first property.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {listings.map((l) => (
            <div key={l._id} className="bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden">
              {l.photos?.[0] && (
                <img src={l.photos[0]} alt={l.propertyType} className="w-full h-40 object-cover" />
              )}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-zinc-100 font-medium capitalize">{l.propertyType}</span>
                  <StatusBadge status={l.status} />
                </div>
                <div className="text-sm text-zinc-400">{l.locality}, {l.city}</div>
                <div className="text-sm text-zinc-400">{l.area} {l.areaUnit} {l.rooms ? `· ${l.rooms} rooms` : ''}</div>
                <div className="text-amber-500 font-semibold mt-2">₹{l.askingPrice?.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
