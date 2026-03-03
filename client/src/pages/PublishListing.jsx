import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';

const PublishListing = () => {
  const [form, setForm] = useState({
    propertyType: 'flat', address: '', locality: '', city: '', pinCode: '',
    area: '', areaUnit: 'gaj', rooms: '', floors: '', askingPrice: '',
    description: '', furnishing: 'unfurnished', propertyAge: ''
  });
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => { if (v) formData.append(k, v); });
      photos.forEach((p) => formData.append('photos', p));
      await api.post('/seller/listing', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success('Listing published!');
      navigate('/seller/listings');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to publish');
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500";

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Publish Property</h1>
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
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Address</label>
          <input name="address" value={form.address} onChange={handleChange} required placeholder="Full address" className={inputCls} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Locality</label>
            <input name="locality" value={form.locality} onChange={handleChange} required placeholder="e.g. Sector 10" className={inputCls} />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">City</label>
            <input name="city" value={form.city} onChange={handleChange} required placeholder="e.g. Jaipur" className={inputCls} />
          </div>
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Pin Code</label>
          <input name="pinCode" value={form.pinCode} onChange={handleChange} required placeholder="e.g. 302001" className={inputCls} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Area</label>
            <input name="area" type="number" value={form.area} onChange={handleChange} required placeholder="e.g. 100" className={inputCls} />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Unit</label>
            <select name="areaUnit" value={form.areaUnit} onChange={handleChange} className={inputCls}>
              <option value="gaj">Gaj</option>
              <option value="sqft">Sq. Ft.</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Rooms</label>
            <input name="rooms" type="number" value={form.rooms} onChange={handleChange} placeholder="Optional" className={inputCls} />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Floors</label>
            <input name="floors" type="number" value={form.floors} onChange={handleChange} placeholder="Optional" className={inputCls} />
          </div>
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Asking Price (₹)</label>
          <input name="askingPrice" type="number" value={form.askingPrice} onChange={handleChange} required placeholder="e.g. 5000000" className={inputCls} />
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} required rows={3} placeholder="Describe the property..." className={inputCls} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Furnishing</label>
            <select name="furnishing" value={form.furnishing} onChange={handleChange} className={inputCls}>
              <option value="unfurnished">Unfurnished</option>
              <option value="semi-furnished">Semi-furnished</option>
              <option value="furnished">Furnished</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Age (years)</label>
            <input name="propertyAge" type="number" value={form.propertyAge} onChange={handleChange} placeholder="e.g. 5" className={inputCls} />
          </div>
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Photos (max 10)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setPhotos(Array.from(e.target.files).slice(0, 10))}
            className="w-full text-sm text-zinc-400 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:bg-zinc-700 file:text-zinc-300 hover:file:bg-zinc-600"
          />
          {photos.length > 0 && <p className="text-xs text-zinc-500 mt-1">{photos.length} file(s) selected</p>}
        </div>
        <button type="submit" disabled={loading} className="w-full bg-amber-500 text-zinc-900 font-medium py-2 rounded hover:bg-amber-400 transition disabled:opacity-50">
          {loading ? 'Publishing...' : 'Publish Listing'}
        </button>
      </form>
    </div>
  );
};

export default PublishListing;
