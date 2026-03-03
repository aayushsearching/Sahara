import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navLinks = () => {
    if (!user) return null;
    if (user.role === 'buyer') {
      return (
        <>
          <Link to="/buyer" className="hover:text-amber-400 transition">Dashboard</Link>
          <Link to="/buyer/enquiry/new" className="hover:text-amber-400 transition">New Enquiry</Link>
          <Link to="/buyer/enquiries" className="hover:text-amber-400 transition">My Enquiries</Link>
          <Link to="/receipts" className="hover:text-amber-400 transition">Receipts</Link>
        </>
      );
    }
    if (user.role === 'seller') {
      return (
        <>
          <Link to="/seller" className="hover:text-amber-400 transition">Dashboard</Link>
          <Link to="/seller/listing/new" className="hover:text-amber-400 transition">New Listing</Link>
          <Link to="/seller/listings" className="hover:text-amber-400 transition">My Listings</Link>
          <Link to="/receipts" className="hover:text-amber-400 transition">Receipts</Link>
        </>
      );
    }
    if (user.role === 'admin') {
      return (
        <>
          <Link to="/admin" className="hover:text-amber-400 transition">Dashboard</Link>
          <Link to="/admin/enquiries" className="hover:text-amber-400 transition">Enquiries</Link>
          <Link to="/admin/listings" className="hover:text-amber-400 transition">Listings</Link>
          <Link to="/admin/deals" className="hover:text-amber-400 transition">Deals</Link>
          <Link to="/admin/payments" className="hover:text-amber-400 transition">Payments</Link>
          <Link to="/admin/users" className="hover:text-amber-400 transition">Users</Link>
        </>
      );
    }
  };

  return (
    <nav className="bg-zinc-900 border-b border-zinc-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-amber-500 font-bold text-xl tracking-widest">SAHARA</Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6 text-sm text-zinc-300">
            {navLinks()}
            {user ? (
              <div className="flex items-center gap-4 ml-4">
                <span className="text-zinc-400 text-xs uppercase tracking-wide">{user.name}</span>
                <button onClick={handleLogout} className="text-zinc-400 hover:text-red-400 transition text-sm">Logout</button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="hover:text-amber-400 transition">Login</Link>
                <Link to="/register" className="bg-amber-500 text-zinc-900 px-4 py-1.5 rounded text-sm font-medium hover:bg-amber-400 transition">Register</Link>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-zinc-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-3 text-sm text-zinc-300">
            {navLinks()}
            {user ? (
              <button onClick={handleLogout} className="text-left text-zinc-400 hover:text-red-400">Logout</button>
            ) : (
              <>
                <Link to="/login" className="hover:text-amber-400">Login</Link>
                <Link to="/register" className="hover:text-amber-400">Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
