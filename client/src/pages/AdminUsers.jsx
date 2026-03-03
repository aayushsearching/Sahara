import { useState, useEffect } from 'react';
import api from '../utils/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    api.get('/admin/users').then(({ data }) => setUsers(data.data)).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDeactivate = async (id) => {
    try {
      await api.delete(`/admin/user/${id}`);
      toast.success('User deactivated');
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  if (loading) return <LoadingSpinner />;

  const roleColors = { buyer: 'text-blue-400', seller: 'text-purple-400', admin: 'text-amber-400' };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      {users.length === 0 ? (
        <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-8 text-center text-zinc-500">No users.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-zinc-700 text-zinc-400">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Email</th>
                <th className="pb-3 font-medium">Phone</th>
                <th className="pb-3 font-medium">Role</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                  <td className="py-3 text-zinc-100">{u.name}</td>
                  <td className="py-3 text-zinc-400">{u.email}</td>
                  <td className="py-3 text-zinc-400">{u.phone}</td>
                  <td className={`py-3 capitalize font-medium ${roleColors[u.role] || ''}`}>{u.role}</td>
                  <td className="py-3">
                    <span className={`text-xs ${u.isActive ? 'text-green-400' : 'text-red-400'}`}>
                      {u.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-3">
                    {u.role !== 'admin' && u.isActive && (
                      <button onClick={() => handleDeactivate(u._id)} className="text-xs text-red-400 hover:text-red-300">
                        Deactivate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
