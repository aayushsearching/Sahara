import { useState, useEffect } from 'react';
import api from '../utils/api';
import StatusBadge from '../components/common/StatusBadge';
import LoadingSpinner from '../components/common/LoadingSpinner';

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/enquiries').then(({ data }) => setEnquiries(data.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">All Buyer Enquiries</h1>
      {enquiries.length === 0 ? (
        <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-8 text-center text-zinc-500">No enquiries yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-zinc-700 text-zinc-400">
                <th className="pb-3 font-medium">Buyer</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Area</th>
                <th className="pb-3 font-medium">City</th>
                <th className="pb-3 font-medium">Budget</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((eq) => (
                <tr key={eq._id} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                  <td className="py-3">
                    <div className="text-zinc-100">{eq.buyer?.name}</div>
                    <div className="text-xs text-zinc-500">{eq.buyer?.phone}</div>
                  </td>
                  <td className="py-3 capitalize">{eq.propertyType}</td>
                  <td className="py-3">{eq.desiredArea} {eq.areaUnit}</td>
                  <td className="py-3">{eq.city}</td>
                  <td className="py-3">₹{eq.budgetMin?.toLocaleString()} - ₹{eq.budgetMax?.toLocaleString()}</td>
                  <td className="py-3"><StatusBadge status={eq.status} /></td>
                  <td className="py-3 text-zinc-500">{new Date(eq.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;
