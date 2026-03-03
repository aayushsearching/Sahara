import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-4rem)] relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Two-column layout */}
      <div className="relative grid md:grid-cols-2 min-h-[calc(100vh-4rem)]">
        {/* Left — Buy */}
        <div className="flex flex-col items-center justify-center text-center px-8 py-20 border-r border-zinc-800">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-4">Want to Buy</h2>
          <p className="text-zinc-500 max-w-xs mb-10 leading-relaxed">
            Browse our listings to find the perfect property for your needs.
          </p>
          <Link
            to={user?.role === 'buyer' ? '/buyer/enquiry/new' : '/register'}
            className="w-full max-w-xs bg-emerald-500 hover:bg-emerald-400 text-white font-semibold py-3.5 rounded-lg text-center transition-colors flex items-center justify-center gap-2"
          >
            Buy Now <span>&rarr;</span>
          </Link>
        </div>

        {/* Right — Sell */}
        <div className="flex flex-col items-center justify-center text-center px-8 py-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-4">Want to Sell</h2>
          <p className="text-zinc-500 max-w-xs mb-10 leading-relaxed">
            List your property for sale and connect with buyers instantly.
          </p>
          <Link
            to={user?.role === 'seller' ? '/seller/listing/new' : '/register'}
            className="w-full max-w-xs bg-rose-500 hover:bg-rose-400 text-white font-semibold py-3.5 rounded-lg text-center transition-colors flex items-center justify-center gap-2"
          >
            Sell Now <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
