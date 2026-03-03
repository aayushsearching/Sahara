import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
    <h1 className="text-6xl font-bold text-zinc-600">404</h1>
    <p className="text-zinc-400 mt-2 mb-6">Page not found</p>
    <Link to="/" className="text-amber-500 hover:text-amber-400 text-sm">Back to Home</Link>
  </div>
);

export default NotFound;
