import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BuyerDashboard from './pages/BuyerDashboard';
import SubmitEnquiry from './pages/SubmitEnquiry';
import MyEnquiries from './pages/MyEnquiries';
import SellerDashboard from './pages/SellerDashboard';
import PublishListing from './pages/PublishListing';
import MyListings from './pages/MyListings';
import AdminDashboard from './pages/AdminDashboard';
import AdminEnquiries from './pages/AdminEnquiries';
import AdminListings from './pages/AdminListings';
import AdminDeals from './pages/AdminDeals';
import AdminPayments from './pages/AdminPayments';
import AdminUsers from './pages/AdminUsers';
import Receipts from './pages/Receipts';
import NotFound from './pages/NotFound';

const App = () => (
  <>
    <Toaster
      position="top-right"
      toastOptions={{
        style: { background: '#27272a', color: '#f4f4f5', border: '1px solid #3f3f46' },
      }}
    />
    <Navbar />
    <main className="min-h-[calc(100vh-4rem)]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/buyer" element={<ProtectedRoute roles={['buyer']}><BuyerDashboard /></ProtectedRoute>} />
        <Route path="/buyer/enquiry/new" element={<ProtectedRoute roles={['buyer']}><SubmitEnquiry /></ProtectedRoute>} />
        <Route path="/buyer/enquiries" element={<ProtectedRoute roles={['buyer']}><MyEnquiries /></ProtectedRoute>} />
        <Route path="/seller" element={<ProtectedRoute roles={['seller']}><SellerDashboard /></ProtectedRoute>} />
        <Route path="/seller/listing/new" element={<ProtectedRoute roles={['seller']}><PublishListing /></ProtectedRoute>} />
        <Route path="/seller/listings" element={<ProtectedRoute roles={['seller']}><MyListings /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/enquiries" element={<ProtectedRoute roles={['admin']}><AdminEnquiries /></ProtectedRoute>} />
        <Route path="/admin/listings" element={<ProtectedRoute roles={['admin']}><AdminListings /></ProtectedRoute>} />
        <Route path="/admin/deals" element={<ProtectedRoute roles={['admin']}><AdminDeals /></ProtectedRoute>} />
        <Route path="/admin/payments" element={<ProtectedRoute roles={['admin']}><AdminPayments /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute roles={['admin']}><AdminUsers /></ProtectedRoute>} />
        <Route path="/receipts" element={<ProtectedRoute roles={['buyer', 'seller']}><Receipts /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  </>
);

export default App;
