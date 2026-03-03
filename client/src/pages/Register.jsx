import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '', role: 'buyer' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      return toast.error('Passwords do not match');
    }
    if (form.password.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }
    setLoading(true);
    try {
      const user = await register(form.name, form.email, form.phone, form.password, form.role);
      toast.success('Account created!');
      if (user.role === 'seller') navigate('/seller');
      else navigate('/buyer');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-8">Create Account</h2>
        <form onSubmit={handleSubmit} className="bg-zinc-800 border border-zinc-700 rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Full Name</label>
            <input name="name" value={form.name} onChange={handleChange} required className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} required className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} required className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Confirm Password</label>
            <input name="confirm" type="password" value={form.confirm} onChange={handleChange} required className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-2">I want to</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setForm({ ...form, role: 'buyer' })}
                className={`py-2 rounded text-sm font-medium transition ${form.role === 'buyer' ? 'bg-amber-500 text-zinc-900' : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'}`}
              >
                Buy Property
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, role: 'seller' })}
                className={`py-2 rounded text-sm font-medium transition ${form.role === 'seller' ? 'bg-amber-500 text-zinc-900' : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'}`}
              >
                Sell Property
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 text-zinc-900 font-medium py-2 rounded hover:bg-amber-400 transition disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>
          <p className="text-center text-sm text-zinc-500">
            Already have an account?{' '}
            <Link to="/login" className="text-amber-500 hover:text-amber-400">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
