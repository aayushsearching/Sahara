import { useState, useEffect } from 'react';
import api from '../utils/api';
import StatusBadge from '../components/common/StatusBadge';
import LoadingSpinner from '../components/common/LoadingSpinner';

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/seller/listing').then(({ data }) => setListings(data.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Listings</h1>
      {listings.length === 0 ? (
        <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-8 text-center text-zinc-500">No listings found.</div>
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
                <div className="text-sm text-zinc-400">{l.address}</div>
                <div className="text-sm text-zinc-400">{l.locality}, {l.city} - {l.pinCode}</div>
                <div className="text-sm text-zinc-400 mt-1">{l.area} {l.areaUnit} {l.rooms ? `· ${l.rooms} rooms` : ''} {l.floors ? `· ${l.floors} floors` : ''}</div>
                <div className="text-sm text-zinc-400 capitalize">{l.furnishing} · {l.propertyAge ? `${l.propertyAge} years old` : 'New'}</div>
                <div className="text-amber-500 font-semibold mt-2">₹{l.askingPrice?.toLocaleString()}</div>
                <div className="text-xs text-zinc-500 mt-1">{new Date(l.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListings;
