import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';

const SubmitEnquiry = () => {
  const [form, setForm] = useState({
    propertyType: 'flat', desiredArea: '', areaUnit: 'gaj',
    preferredLocation: '', city: '', budgetMin: '', budgetMax: '', notes: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/buyer/enquiry', form);
      toast.success('Enquiry submitted!');
      navigate('/buyer/enquiries');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit');
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500";

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Submit Buy Enquiry</h1>
      <form onSubmit={handleSubmit} className="bg-zinc-800 border border-zinc-700 rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Property Type</label>
          <select name="propertyType" value={form.propertyType} onChange={handleChange} className={inputCls}>
            <option value="flat">Flat</option>
            <option value="house">House</option>
            <option value="plot">Plot</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Area</label>
            <input name="desiredArea" type="number" value={form.desiredArea} onChange={handleChange} required placeholder="e.g. 100" className={inputCls} />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Unit</label>
            <select name="areaUnit" value={form.areaUnit} onChange={handleChange} className={inputCls}>
              <option value="gaj">Gaj</option>
              <option value="sqft">Sq. Ft.</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Preferred Location</label>
          <input name="preferredLocation" value={form.preferredLocation} onChange={handleChange} required placeholder="e.g. Sector 10" className={inputCls} />
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">City</label>
          <input name="city" value={form.city} onChange={handleChange} required placeholder="e.g. Jaipur" className={inputCls} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Min Budget (₹)</label>
            <input name="budgetMin" type="number" value={form.budgetMin} onChange={handleChange} required placeholder="e.g. 1000000" className={inputCls} />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Max Budget (₹)</label>
            <input name="budgetMax" type="number" value={form.budgetMax} onChange={handleChange} required placeholder="e.g. 5000000" className={inputCls} />
          </div>
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Notes (optional)</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder="Any additional requirements..." className={inputCls} />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-amber-500 text-zinc-900 font-medium py-2 rounded hover:bg-amber-400 transition disabled:opacity-50">
          {loading ? 'Submitting...' : 'Submit Enquiry'}
        </button>
      </form>
    </div>
  );
};

export default SubmitEnquiry;
